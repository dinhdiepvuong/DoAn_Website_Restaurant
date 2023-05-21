import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { findOneProduct } from '../redux/slices/productSlice';
import { AppDispatch } from '../redux/store';
import { Notification, PRODUCT_TYPE } from '../utils';

function DrinkDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [drink, setDrink] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    id,
                    query: {
                        type: PRODUCT_TYPE.DRINK
                    }
                }
                const result = await dispatch(findOneProduct(params)).unwrap();

                const { product } = result?.data;
                if (product)
                    setDrink(product);
                else
                    navigate("/drinks/list");
            } catch (error) {
                navigate("/drinks/list");
                Notification("error", "Lấy thông tin đồ uống thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/drinks/list");
    }

    return (
        <>
            <div className="font20 font_family_bold mt-2">Chi tiết đồ uống</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Thông tin</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Thêm thông tin của đồ uống
                    </div>
                </div>
                <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                    <div className="font_family_bold_italic font14 mb-2">Loại đồ uống</div>
                    <div className='d-flex align-items-center'>
                        <Avatar url={drink?.productType?.avatar} shape="rectangle" size={60} />
                        <div className='ml_10px font14 font_family_bold_italic'>{drink?.productType?.name}</div>
                    </div>
                    <div className="mt-4 font_family_bold_italic font14 mt-4">Tên đồ uống</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Tên đồ uống"
                        type="text"
                        value={drink?.name}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Đơn giá</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Đơn giá đồ uống"
                        type="text"
                        value={drink?.price}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                    <textarea
                        placeholder="Mô tả đồ uống"
                        className="w100_per mt-2"
                        rows={5}
                        value={drink?.description || `Trống`}
                        disabled
                    ></textarea>
                    <div className="font_family_bold_italic font14 mt-4">Ảnh đại diện</div>

                    <div className='mt-4'>
                        <Avatar url={drink?.avatar} shape="rectangle" size={100} />
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

export default DrinkDetail