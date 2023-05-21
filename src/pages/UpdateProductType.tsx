import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from '../components/UploadImage';
import BaseFileChosen from '../base/BaseFileChosen';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ENTITY_STATUS, genStatusFood, genTypeOfProductType, ICON, PRODUCT_TYPE, textAlign } from '../utils';
import { Icon } from '@iconify/react';
import ModalListObject from '../components/modal/ModalListObject';
import Avatar from '../components/Avatar';
import { currencyFormat } from '../utils/format';
import { findAllProductTypes, updateProductType } from '../redux/slices/productTypeSlice';
import themeSlice from '../redux/slices/themeSlice';
import { saveImage } from '../utils/firebase';

const header = [
    {
        name: "Ảnh đại diện",
        width: "20%",
        dataKey: 'avatar',
        render: (data: any) => <Avatar url={data} size={42} shape="rectangle" />,
        textAlign: textAlign("left"),
    },
    {
        name: "Tên loại món ăn",
        width: "20%",
        dataKey: 'name',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Số lượng món ăn",
        width: "20%",
        dataKey: 'quantityProduct',
        render: (data: any) => <div style={{ textAlign: 'center' }}>{data}</div>,
        textAlign: textAlign("center"),
    },
    {
        name: "Loại",
        width: "15%",
        dataKey: 'type',
        render: (data: any) => <div>{genTypeOfProductType(data || PRODUCT_TYPE.FOOD)}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Trạng thái",
        width: "15%",
        dataKey: 'status',
        render: (data: any) => <div className={`d-inline py-1 px-2 border_radius_10 font12 font_family_bold_italic ${data === ENTITY_STATUS.ACTIVATED ? `bg_primary color_white` : `bg_red color_black`}`}>
            {genStatusFood(data).name}
        </div>,
        textAlign: textAlign("left"),
    },
    {
        name: "",
        width: "10%",
        dataKey: 'id',
        render: (data: any, chosen?: any) => <>
            {
                chosen ? <Icon icon={ICON.SELECTED} className="icon20x20 color_primary" />
                    : <Icon icon={ICON.UNSELECT} className="icon20x20 color_primary" />
            }
        </>,
        textAlign: textAlign("right"),
    },
];

const schema = yup.object({
    name: yup.string().required("Tên loại món ăn không được trống"),
    description: yup.string(),
});

function UpdateProductType() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorImage, setErrorImage] = useState<string>('');
    const [avatar, setAvatar] = useState<any[]>([]);
    const [type, setType] = useState<number>();
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: 'Danh sách loại món ăn',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [chosenProductType, setChosenProductType] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [name, setName] = useState<string>('');

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
                    page,
                    name
                }

                const result: any = await dispatch(findAllProductTypes(params)).unwrap();

                const { data, pagination } = result?.data;

                setDataModal((prevState: any) => {
                    return {
                        ...prevState,
                        data: data || [],
                        total: pagination[0]?.total | 0
                    }
                })
            } catch (error: any) {
                console.log('error', error);
            }
        }

        initData();
    }, [dispatch, name, page]);

    const handleChoose = (e: any) => {
        const { name, description, avatar, type } = e?.data;
        setValue("name", name);
        setValue("description", description);

        setAvatar([avatar]);
        setType(type || PRODUCT_TYPE.FOOD);

        setChosenProductType(e);
    }

    const handleCloseModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: false
            }
        })
    }

    const handleOpenModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: true,
            }
        })
    }

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

            const newProductType = {
                ...chosenProductType?.data,
                name: data.name,
                description: data.description || '',
                status: chosenProductType?.data?.status,
                type,
            };

            saveProductType(newProductType);
        }
    }

    const saveProductType = async (productType: any) => {
        try {
            let avatarUrl = chosenProductType?.data.avatar;
            if (typeof avatar[0] !== 'string')
                avatarUrl = await saveImage("productTypes", avatar[0]);
            const body = {
                ...productType,
                avatar: avatarUrl,
            };

            await dispatch(updateProductType(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật loại món ăn thành công",
                    type: "success",
                })
            );

            navigate("/product-types/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật loại món ăn thất bại",
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
                <div className="font20 font_family_bold mt-2">Cập nhật thông tin loại món ăn</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="box_shadow_card bg_white border_radius_5 p-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="font16 font_family_bold_italic">
                            Chọn loại món ăn
                        </div>
                        <button onClick={handleOpenModal} type="button" className="btn bg_primary color_white font18 font_family_bold_italic">Danh sách loại món ăn</button>
                    </div>
                    <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
                        {
                            chosenProductType?.data ?
                                <>
                                    <Icon icon={ICON.SELECTED} className="icon50x50 color_primary" />
                                    <div>Bạn đã chọn loại món ăn</div>
                                </>
                                :
                                <>
                                    <Icon icon={ICON.CLOSE} className="icon50x50 color_red" />
                                    <div className="mt-2 font14 font_family_bold_italic">Bạn chưa chọn loại món ăn</div>
                                </>
                        }

                    </div>
                </div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-4 mt-2">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular d-flex mb-3 mt-2 color_888">
                            Thông tin của loại món ăn
                        </div>
                    </div>
                    <div className="col-12 col-lg-12 bg_white box_shadow_card border_radius_5 p-4">
                        <div className='d-flex align-items-center justify-content-center'>
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
                        disabled={Boolean(!chosenProductType?.data)}
                        type="submit"
                        className="btn bg_primary font20 font_family_bold color_white"
                    >
                        Cập nhật thông tin
                    </button>
                </div>
            </form>
            <ModalListObject handleFilter={(e: any) => setName(e)} onChangePage={(e: any) => setPage(e)} page={page} handleClose={handleCloseModal} chosenData={chosenProductType} data={dataModal} header={header} onChoose={handleChoose} />
        </>
    )
}

export default UpdateProductType