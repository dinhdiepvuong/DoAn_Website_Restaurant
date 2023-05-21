import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { findOneFood } from '../redux/slices/foodSlice';
import { findOneProduct } from '../redux/slices/productSlice';
import { AppDispatch } from '../redux/store';
import { Notification, PRODUCT_TYPE } from '../utils';

function FoodDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [food, setFood] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    id,
                    query: {
                        type: PRODUCT_TYPE.FOOD
                    }
                }
                const result: any = await dispatch(findOneProduct(params)).unwrap();

                const { product } = result?.data;
                if (product)
                    setFood(product);
                else
                    navigate("/foods/list");
            } catch (error) {
                navigate("/foods/list");
                Notification("error", "Lấy thông tin món ăn thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/foods/list");
    }

    return (
        <>
            <div className="font20 font_family_bold mt-2">Chi tiết món ăn</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Thông tin</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Thêm thông tin của món ăn
                    </div>
                </div>
                <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                    <div className="font_family_bold_italic font14 mb-2">Loại món ăn</div>
                    <div className='d-flex align-items-center'>
                        <Avatar url={food?.productType?.avatar} shape="rectangle" size={60} />
                        <div className='ml_10px font14 font_family_bold_italic'>{food?.productType?.name}</div>
                    </div>
                    <div className="mt-4 font_family_bold_italic font14 mt-4">Tên món ăn</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Tên món ăn"
                        type="text"
                        value={food?.name}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Đơn giá</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Đơn giá món ăn"
                        type="text"
                        value={food?.price}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                    <textarea
                        placeholder="Mô tả món ăn"
                        className="w100_per mt-2"
                        rows={5}
                        value={food?.description || `Trống`}
                        disabled
                    ></textarea>
                    <div className="font_family_bold_italic font14 mt-4">Ảnh đại diện</div>
                    <div className='mt-4'>
                        <Avatar url={food?.avatar} shape="rectangle" size={100} />
                    </div>
                </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
                <button
                    onClick={handleBack}
                    type="button"
                    className="btn bg_primary font14 font_family_bold color_white"
                >
                    Quay lại
                </button>
            </div>
        </>
    )
}

export default FoodDetail