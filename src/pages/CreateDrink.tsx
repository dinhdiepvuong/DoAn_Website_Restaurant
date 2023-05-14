import React, { useEffect, useState } from 'react'
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
import { createProduct } from '../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { findAllProductTypes } from '../redux/slices/productTypeSlice';
import Select from 'react-select';
import Avatar from '../components/Avatar';

const schema = yup.object({
    name: yup.string().required("Tên đồ uống không được trống"),
    price: yup.number().typeError("Giá phải là số").required("Đơn giá không được trống"),
    description: yup.string(),
    productTypeId: yup.string().required("Loại đồ uống không được trống"),
});

function CreateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorImage, setErrorImage] = useState<string>('');
    const [avatar, setAvatar] = useState<any[]>([]);
    const [option, setOption] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    type: PRODUCT_TYPE.DRINK
                }

                const result: any = await dispatch(findAllProductTypes(params)).unwrap();

                const { data } = result?.data;

                const dataProductType: any[] = [];

                (data || []).forEach((productType: any) => {
                    dataProductType.push({
                        value: {
                            avatar: productType?.avatar || '',
                            value: productType?.id,
                            name: productType?.name
                        },
                        label: productType?.name,
                    })
                })

                setOption(dataProductType.map((item, index) => {
                    item.label = (
                        <div className="d-flex align-items-center">
                            <Avatar shape='rectangle' size={30} url={item?.value?.avatar} />
                            <span className="ml_10px font14 font_family_bold">{item.label}</span>
                        </div>
                    );
                    return item;
                }));
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách loại đồ uống thất bại",
                        type: "error",
                    })
                );
            }
        };

        initData();
    }, [dispatch]);

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

            const product = {
                name: data.name,
                price: data.price,
                description: data.description || '',
                status: ENTITY_STATUS.ACTIVATED,
                productTypeId: data?.productTypeId,
                type: PRODUCT_TYPE.DRINK,
            };

            saveProduct(product);
        }
    }

    const saveProduct = async (product: any) => {
        try {
            const avatarUrl = await saveImage("products", avatar[0]);
            const body = {
                ...product,
                avatar: avatarUrl,
            };

            await dispatch(createProduct(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm đồ uống thành công",
                    type: "success",
                })
            );

            navigate("/drinks/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm đồ uống thất bại",
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

    const handleChooseProductType = (value: any) => {
        setValue('productTypeId', value?.value?.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font25 d-flex justify-content-center font_family_bold mt-2">Thêm đồ uống mới</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-12 mt-2 mb-3">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Thêm thông tin của đồ uống
                        </div>
                    </div>
                    <div className="col-12 col-lg-12 bg_white box_shadow_card border_radius_5 p-4">
                        <div className="font_family_bold_italic font14 mb-2">Loại đồ uống</div>
                        <Select
                            // value={option.filter((option) => option.value.value === table.areaId)}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: "40px",
                                    marginTop: "8px",
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: "#ddd",
                                    primary50: "#ddd",
                                    primary: "rgba(0,159,127)",
                                },
                            })}
                            placeholder="Chọn loại đồ uống"
                            onChange={(value) => handleChooseProductType(value)}
                            options={option}
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.productTypeId?.message}
                        </div>
                        <div className="mt-4 font_family_bold_italic font14 mt-4">Tên đồ uống</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("name")}
                            placeholder="Nhập tên đồ uống"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.name?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Đơn giá</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("price")}
                            placeholder="Nhập đơn giá đồ uống"
                            type="number"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.price?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                        <textarea
                            {...register("description")}
                            placeholder="Nhập mô tả đồ uống"
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
                        Thêm đồ uống
                    </button>
                </div>
            </form>
        </>
    )
}

export default React.memo(CreateProduct);