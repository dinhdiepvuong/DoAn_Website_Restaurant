import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from '../components/UploadImage';
import BaseFileChosen from '../base/BaseFileChosen';
import { ENTITY_STATUS, ICON, PRODUCT_TYPE } from '../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import themeSlice from '../redux/slices/themeSlice';
import { saveImage } from '../utils/firebase';
import { createProductType } from '../redux/slices/productTypeSlice';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const schema = yup.object({
    name: yup.string().required("Tên loại món ăn không được trống"),
    description: yup.string(),
});

function CreateProductType() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorImage, setErrorImage] = useState<string>('');
    const [avatar, setAvatar] = useState<any[]>([]);
    const [type, setType] = useState<number>(PRODUCT_TYPE.FOOD);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        if (avatar.length === 0) setErrorImage("Bạn chưa chọn ảnh đại diện");
        else {
            setErrorImage("");

            dispatch(
                themeSlice.actions.showBackdrop({
                    isShow: true,
                    content: "",
                })
            );

            const productType = {
                name: data.name,
                description: data.description || '',
                status: ENTITY_STATUS.ACTIVATED,
                type,
            };

            saveProductType(productType);
        }
    }

    const saveProductType = async (productType: any) => {
        try {
            const avatarUrl = await saveImage("productTypes", avatar[0]);
            const body = {
                ...productType,
                avatar: avatarUrl,
            };

            await dispatch(createProductType(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm loại món ăn thành công",
                    type: "success",
                })
            );

            navigate("/product-types/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm loại món ăn thất bại",
                    type: "error",
                })
            );
        } finally {
            dispatch(
                themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: "",
                })
            );
        }
    };

    const onChooseAvatar = (e: any) => {
        const file = e.target.files[0];
        setAvatar([file]);
    };
    const handleDeleteAvatar = (position: number) => {
        setAvatar([]);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font25 d-flex justify-content-center font_family_bold mt-2">Thêm loại món ăn mới</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-12 mb-3 mt-2">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Thêm thông tin của loại món ăn
                        </div>
                    </div>
                    <div className="col-12 col-lg-12 bg_white box_shadow_card border_radius_5 p-4">
                        <div className='d-flex font25 justify-content-center align-items-center'>
                            <div onClick={() => setType(PRODUCT_TYPE.FOOD)} className={`cursor_pointer bg_btn_typeproduct d-flex align-items-center border_radius_5 w200_px justify-content-center p-3 ${type === PRODUCT_TYPE.FOOD ? `border_primary_1px` : `border_black_1px`}`}>
                                <Icon icon={ICON.FOOD} className={`icon30x30 ${type === PRODUCT_TYPE.FOOD ? `color_primary` : ``}`} />
                                <div className={`font16 font_family_bold ml_20px ${type === PRODUCT_TYPE.FOOD ? `color_primary` : ``} `}>Món ăn</div>
                            </div>
                            <div onClick={() => setType(PRODUCT_TYPE.DRINK)} className={`ml_20px cursor_pointer bg_btn_typeproductdrink d-flex align-items-center border_radius_5 w200_px justify-content-center p-3 ${type === PRODUCT_TYPE.DRINK ? `border_primary_1px` : `border_black_1px`}`}>
                                <Icon icon={ICON.DRINK} className={`icon30x30 ${type === PRODUCT_TYPE.DRINK ? `color_primary` : ``}`} />
                                <div className={`font16 font_family_bold ml_20px ${type === PRODUCT_TYPE.DRINK ? `color_primary` : ``} `}>Đồ uống</div>
                            </div>
                        </div>
                        <div className="mt-4 font_family_bold_italic font14">Tên loại món ăn</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("name")}
                            placeholder="Nhập tên loại món ăn"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.name?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                        <textarea
                            {...register("description")}
                            placeholder="Nhập mô tả loại món ăn"
                            className="w100_per mt-2"
                            rows={5}
                        ></textarea>
                        <UploadImage onChooseAvatar={onChooseAvatar} />
                        <div className="d-flex flex-wrap mt-2">
                            {avatar.map((item: any, index: any) => (
                                <BaseFileChosen
                                    file={true}
                                    close={handleDeleteAvatar}
                                    index={index}
                                    key={index}
                                    image={item}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-4"></div>
                    <div
                        className={`col-12 col-lg-8 border_radius_5 py-2 px-4 color_red ${errorImage.length > 0 ? `bg_red` : `d-none`
                            }`}
                    >
                        {errorImage}
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn bg_primary font20 font_family_bold color_white"
                    >
                        Thêm loại món ăn
                    </button>
                </div>
            </form>
        </>
    )
}

export default React.memo(CreateProductType);