import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from '../components/UploadImage';
import BaseFileChosen from '../base/BaseFileChosen';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ENTITY_STATUS, genStatusFood, ICON, textAlign } from '../utils';
import { Icon } from '@iconify/react';
import ModalListObject from '../components/modal/ModalListObject';
import Select from 'react-select';
import { findAllAreas } from '../redux/slices/areaSlice';
import themeSlice from '../redux/slices/themeSlice';
import { findAllTables, updateTable } from '../redux/slices/tableSlice';
import Avatar from '../components/Avatar';

const header = [
    {
        name: "Tên bàn",
        width: "30%",
        dataKey: 'name',
        render: (data: any) => <div className='p-2'>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Số người tối đa",
        width: "20%",
        dataKey: 'quantity',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Trạng thái",
        width: "20%",
        dataKey: 'status',
        render: (data: any) => <div className={`d-inline py-1 px-2 border_radius_10 font12 font_family_bold_italic ${data === ENTITY_STATUS.ACTIVATED ? `bg_primary color_white` : `bg_red color_black`}`}>
            {genStatusFood(data).name}
        </div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Khu vực",
        width: "20%",
        dataKey: 'areaName',
        render: (data: any) => <div>{data}</div>,
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
    name: yup.string(),
    quantity: yup.number().typeError("Số người tối đa phải là số").required("Số người tối đa không được trống"),
});

function UpdateTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: 'Danh sách bàn',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [chosenTable, setChosenTable] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [option, setOption] = useState<any[]>([]);
    const [areaId, setAreaId] = useState<string>('');
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
        const initDataArea = async () => {
            try {
                const params = {
                    // page
                }

                const result: any = await dispatch(findAllAreas(params)).unwrap();

                const { data } = result?.data;

                const dataArea: any[] = [];

                (data || []).forEach((area: any) => {
                    dataArea.push({
                        value: {
                            avatar: area?.avatar || '',
                            value: area?.id,
                            name: area?.name
                        },
                        label: area?.name,
                    })
                })

                setOption(dataArea.map((item, index) => {
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
                        content: "Lấy danh sách khu vực thất bại",
                        type: "error",
                    })
                );
            }
        };

        initDataArea();
    }, [dispatch]);

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    page,
                    name
                }

                const result: any = await dispatch(findAllTables(params)).unwrap();

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
    }, [dispatch, page, name]);

    const handleChoose = (e: any) => {
        const { name, quantity, areaId } = e?.data;
        setValue("name", name);
        setValue("quantity", quantity);

        setAreaId(areaId);
        setChosenTable(e);
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
        const newTable = {
            ...chosenTable?.data,
            name: data?.name,
            quantity: data?.quantity,
            ...(areaId ? { areaId } : {})
        }

        saveTable(newTable);
    }

    const saveTable = async (table: any[]) => {
        try {
            const body = {
                ...table
            }

            await dispatch(updateTable(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật bàn thành công",
                    type: "success",
                })
            );

            navigate("/tables/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật bàn thất bại",
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font25 d-flex justify-content-center font_family_bold mt-2">Cập nhật thông tin bàn</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="box_shadow_card bg_white border_radius_5 p-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="font16 font_family_bold_italic">
                            Chọn bàn
                        </div>
                        <button onClick={handleOpenModal} type="button" className="btn bg_primary color_white font18 font_family_bold_italic">Danh sách bàn</button>
                    </div>
                    <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
                        {
                            chosenTable?.data ?
                                <>
                                    <Icon icon={ICON.SELECTED} className="icon50x50 color_primary" />
                                    <div>Bạn đã chọn bàn</div>
                                </>
                                :
                                <>
                                    <Icon icon={ICON.CLOSE} className="icon50x50 color_red" />
                                    <div className="mt-2 font14 font_family_bold_italic">Bạn chưa chọn bàn</div>
                                </>
                        }

                    </div>
                </div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-12 mt-2">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular mt-2 mb-3 color_888">
                            Thông tin danh sách bàn
                        </div>
                    </div>
                    <div className='col-12 col-lg-12 bg_white box_shadow_card border_radius_5 p-4'>
                        <div className="font_family_bold_italic font14">
                            Chọn khu vực
                        </div>
                        <Select
                            value={option.filter((option) => option.value.value === areaId)}
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
                            placeholder="Chọn khu vực"
                            // onChange={(value) => handleChooseArea(value, index)}
                            options={option}
                        />
                        <div className="font_family_bold_italic font14 mt-4">Tên bàn</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            placeholder="Tự động khi chọn khu vực"
                            type="text"
                            {...register("name")}
                            disabled
                        />
                        <div className="mt-2 font13 ml_5px color_primary font_family_italic">
                            Tự động khi chọn khu vực
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Số người tối đa</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            placeholder="Nhập số người tối đa"
                            type="number"
                            {...register("quantity")}
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.quantity?.message}
                        </div>
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        disabled={Boolean(!chosenTable?.data)}
                        type="submit"
                        className="btn bg_primary font18 font_family_bold color_white"
                    >
                        Cập nhật thông tin
                    </button>
                </div>
            </form>
            <ModalListObject handleFilter={(e) => setName(e)} onChangePage={(e: any) => setPage(e)} page={page} handleClose={handleCloseModal} chosenData={chosenTable} data={dataModal} header={header} onChoose={handleChoose} />
        </>
    )
}

export default UpdateTable