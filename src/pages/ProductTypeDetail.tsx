import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { findOneProductType } from '../redux/slices/productTypeSlice';
import { AppDispatch } from '../redux/store';
import { ICON, Notification, PRODUCT_TYPE } from '../utils';

function ProductTypeDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [productType, setProductType] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const result: any = await dispatch(findOneProductType(id)).unwrap();

                const { productType } = result?.data;
                if (productType)
                    setProductType(productType);
                else
                    navigate("/product-types/list");
            } catch (error) {
                navigate("/product-types/list");
                Notification("error", "Lấy thông tin loại món ăn thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/product-types/list");
    }

    return (
        <>
            <div className="font20 font_family_bold mt-2">Chi tiết món ăn</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Thông tin</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Thêm thông tin của loại món ăn
                    </div>
                </div>
                <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                    <div className='d-flex align-items-center'>
                        <div className={`cursor_pointer d-flex align-items-center border_radius_5 w200_px justify-content-center p-3 ${productType?.type === PRODUCT_TYPE.FOOD ? `border_primary_1px` : `border_black_1px`}`}>
                            <Icon icon={ICON.FOOD} className={`icon30x30 ${productType?.type === PRODUCT_TYPE.FOOD ? `color_primary` : ``}`} />
                            <div className={`font16 font_family_bold ml_20px ${productType?.type === PRODUCT_TYPE.FOOD ? `color_primary` : ``} `}>Món ăn</div>
                        </div>
                        <div className={`ml_20px cursor_pointer d-flex align-items-center border_radius_5 w200_px justify-content-center p-3 ${productType?.type === PRODUCT_TYPE.DRINK ? `border_primary_1px` : `border_black_1px`}`}>
                            <Icon icon={ICON.DRINK} className={`icon30x30 ${productType?.type === PRODUCT_TYPE.DRINK ? `color_primary` : ``}`} />
                            <div className={`font16 font_family_bold ml_20px ${productType?.type === PRODUCT_TYPE.DRINK ? `color_primary` : ``} `}>Đồ uống</div>
                        </div>
                    </div>
                    <div className="mt-4 font_family_bold_italic font14">Tên loại món ăn</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Tên loại món ăn"
                        type="text"
                        value={productType?.name}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                    <textarea
                        placeholder="Mô tả loại món ăn"
                        className="w100_per mt-2"
                        rows={5}
                        value={productType?.description}
                        disabled
                    ></textarea>
                    <div className="font_family_bold_italic font14 mt-4">Ảnh đại diện</div>
                    <div className='mt-4'>
                        <Avatar url={productType?.avatar} shape="rectangle" size={100} />
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

export default ProductTypeDetail