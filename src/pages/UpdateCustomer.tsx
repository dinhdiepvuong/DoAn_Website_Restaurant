import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import location from "../utils/location";
import { Icon } from "@iconify/react";
import BaseFileChosen from "../base/BaseFileChosen";
import { saveImage } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import { useNavigate } from "react-router-dom";
import orderSlice from "../redux/slices/orderSlice";
import UploadImage from "../components/UploadImage";
import BoxRadio from "../components/BoxRadio";
import { dataGender, genAddress, GENDER, ICON, textAlign } from "../utils";
import { createCustomer, findAllCustomers, updateCustomer } from "../redux/slices/customerSlice";
import { CustomerType } from "../interfaces";
import ModalListObject from "../components/modal/ModalListObject";
import Avatar from "../components/Avatar";
import { Collapse } from "react-bootstrap";

const schema = yup.object({
    name: yup.string().required("Họ tên khách hàng trống"),
    email: yup.string().required("Email trống").email("Email không hợp lệ"),
    phone: yup.string().required("Số điện thoại trống"),
    city: yup.string().required("Tỉnh/Thành phố trống"),
    identity: yup.string(),
    district: yup.string().required("Quận/Huyện trống"),
    ward: yup.string().required("Phường/Xã trống"),
    street: yup.string().required("Đường trống"),
});

const header = [
    {
        name: "Ảnh đại diện",
        width: "15%",
        dataKey: 'avatar',
        render: (data: any) => <Avatar url={data} size={42} shape="rectangle" />,
        textAlign: textAlign("left"),
    },
    {
        name: "Họ tên",
        width: "30%",
        dataKey: 'name',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Số điện thoại",
        width: "20%",
        dataKey: 'phone',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Email",
        width: "20%",
        dataKey: 'email',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "CMND/CCCD",
        width: "15%",
        dataKey: 'identity',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "",
        width: "5%",
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

function UpdateCustomer() {
    const [birthday, setBirthday] = useState<Date>(new Date(2000, 9, 8));
    const [options, setOptions] = useState<any[]>([]);
    const [options2, setOptions2] = useState<any[]>([]);
    const [options3, setOptions3] = useState<any[]>([]);
    const [avatar, setAvatar] = useState<any[]>([]);
    const [chosenCustomer, setChosenCustomer] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [phone, setPhone] = useState<string>('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const city = watch("city");

    const [errorImage, setErrorImage] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [gender, setGender] = useState<number>(GENDER.MALE);
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: 'Danh sách khách hàng',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        const data: any[] = [];
        location.forEach((item: any) =>
            data.push({
                value: item,
                label: item.name,
            })
        );
        setOptions(data);
    }, []);

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    page,
                    phone
                }

                const result: any = await dispatch(findAllCustomers(params)).unwrap();

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
    }, [dispatch, page, phone]);

    const handleChoose = (e: any) => {
        const { name, email, phone, gender, avatar, birthday, identity, address } = e?.data;
        setValue("name", name);
        setValue("email", email);
        setValue("phone", phone);
        setValue("identity", identity);
        setValue("street", address?.street);
        setValue("city", address?.city);
        setValue("district", address?.district);
        setValue("ward", address?.ward);

        setAvatar([avatar]);
        setGender(gender);
        setBirthday(new Date(birthday));

        setChosenCustomer(e)
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
        if (avatar.length === 0)
            setErrorImage("Bạn chưa chọn hình ảnh");
        else {
            dispatch(
                themeSlice.actions.showBackdrop({
                    isShow: true,
                    content: "",
                })
            );
            setErrorImage("");

            const newCustomer = {
                ...chosenCustomer?.data,
                name: data.name,
                email: data.email,
                phone: data.phone,
                birthday: birthday,
                gender: gender,
                identity: data.identity || "",
                address: {
                    city: data.city,
                    district: data.district,
                    ward: data.ward,
                    street: data.street,
                },
            };

            saveCustomer(newCustomer);
        }
    }

    const saveCustomer = async (user: any) => {
        try {
            let avatarUrl = chosenCustomer?.data.avatar;
            if (typeof avatar[0] !== 'string')
                avatarUrl = await saveImage("users", avatar[0]);
            const body = {
                ...user,
                avatar: avatarUrl,
            };

            const result = await dispatch(updateCustomer(body)).unwrap();
            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật khách hàng thành công",
                    type: "success",
                })
            );
            navigate("/users/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật khách hàng thất bại",
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

    const handleChooseCity = (value: any) => {
        setValue("city", value.label);
        const data: any[] = [];
        value.value.districts.forEach((district: any) => {
            data.push({
                label: district.name,
                value: district,
            });
        });
        setOptions2(data);
        setOptions3([]);
    };

    const handleChooseDistrict = (value: any) => {
        setValue("district", value.label);
        const data: any[] = [];
        value.value.wards.forEach((ward: any) => {
            data.push({
                label: `${ward.prefix} ${ward.name}`,
                value: ward,
            });
        });
        setOptions3(data);
    };

    const handleChooseWard = (value: any) => {
        setValue("ward", value.label);
    };

    const onChooseAvatar = (e: any) => {
        const file = e.target.files[0];
        setAvatar([file]);
    };

    const handleDeleteAvatar = (position: number) => {
        setAvatar([]);
    };

    const handleChangeGender = (e: any) => {
        setGender(e);
    }

    const handleShowEdit = (status: boolean) => {
        setIsEdit(status);
        if (!status) {
            const { address } = chosenCustomer?.data;
            setValue("city", address.city);
            setValue("district", address.district);
            setValue("ward", address.ward);
            setValue("street", address.street);
            setOptions([]);
            setOptions2([]);
            setOptions3([]);
        } else {
            setValue("city", "");
            setValue("district", "");
            setValue("ward", "");
            setValue("street", "");
            const data: any[] = [];
            location.forEach((item: any) =>
                data.push({
                    value: item,
                    label: item.name,
                })
            );
            setOptions(data);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font25 d-flex justify-content-center font_family_bold mt-2">Cập nhật thông tin khách hàng</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="box_shadow_card bg_white border_radius_5 p-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="font20 font_family_bold_italic">
                            Chọn khách hàng
                        </div>
                        <button onClick={handleOpenModal} type="button" className="btn bg_primary color_white p-2 font20 font_family_bold_italic">Danh sách khách hàng</button>
                    </div>
                    <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
                        {
                            chosenCustomer?.data ?
                                <>
                                    <Icon icon={ICON.SELECTED} className="icon50x50 color_primary" />
                                    <div>Bạn đã chọn khách hàng</div>
                                </>
                                :
                                <>
                                    <Icon icon={ICON.CLOSE} className="icon50x50 color_red" />
                                    <div className="mt-2 font14 font_family_bold_italic">Bạn chưa chọn khách hàng</div>
                                </>
                        }

                    </div>
                </div>
                <div className="my-4 divider_vertical_dashed "></div>
                <div className="col-12 col-lg-12 row">
                    <div className="col-12 col-lg-6 row p-0 m-0 mt-4">
                        <div className="col-12 col-lg-12 mt-2 mb-3">
                            <div className="font18 font_family_bold">Thông tin</div>
                            <div className="font14 font_family_regular mt-2 color_888">
                                Thêm thông tin cơ bản của khách hàng
                            </div>
                        </div>
                        <div className="col-12 col-lg-11 bg_white box_shadow_card border_radius_5 p-4">
                            <div className="font_family_bold_italic font14">Họ tên</div>
                            <input
                                className="mt-2 h40_px w100_per"
                                {...register("name")}
                                placeholder="Nhập họ tên khách hàng"
                                type="text"
                            />
                            <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                {errors.name?.message}
                            </div>
                            <div className="font_family_bold_italic font14 mt-4">Email</div>
                            <input
                                className="mt-2 h40_px w100_per"
                                {...register("email")}
                                placeholder="Nhập email"
                                type="text"
                            />
                            <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                {errors.email?.message}
                            </div>
                            <div className="font_family_bold_italic font14 mt-4">Số điện thoại</div>
                            <input
                                className="mt-2 h40_px w100_per"
                                {...register("phone")}
                                placeholder="Nhập số điện thoại"
                                type="text"
                            />
                            <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                {errors.phone?.message}
                            </div>
                            <div className="font_family_bold_italic font14 mt-4">
                                Giới tính
                            </div>
                            <div className="mt-2">
                                <BoxRadio value={gender} data={dataGender} onChange={handleChangeGender} />
                            </div>
                            <div className="font_family_bold_italic font14 mt-4">
                                Ngày sinh
                            </div>
                            <DatePicker
                                maxDate={new Date()}
                                customInput={
                                    <input
                                        className="mt-2 h40_px w100_per"
                                        placeholder="Nhập ngày sinh"
                                        type="text"
                                    />
                                }
                                selected={birthday}
                                dateFormat="dd/MM/yyyy"
                                onChange={(newValue: Date) => {
                                    setBirthday(newValue);
                                }}
                            />
                            <div className="font_family_bold_italic font14 mt-4">CMND/CCCD</div>
                            <input
                                className="mt-2 h40_px w100_per"
                                {...register("identity")}
                                placeholder="Nhập chứng minh thư"
                                type="text"
                            />
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
                    {/* <div className="my-4 divider_vertical_dashed"></div> */}
                    <div className="col-12 col-lg-6 row p-0 m-0 mt-4 ">
                        <div className="col-12 col-lg-12 mt-2">
                            <div className="font18 font_family_bold">Địa chỉ</div>
                            <div className="font14 font_family_regular mt-2 color_888">
                                Chọn địa chỉ của khách hàng
                            </div>
                        </div>
                        <div className="col-12 col-lg-11 bg_white box_shadow_card border_radius_5 p-4">
                            <div className="font_family_bold_italic font14">Address</div>
                            <div className="font16 font_family_italic mt-2">
                                {chosenCustomer?.data ? genAddress(chosenCustomer?.data?.address) : `Bạn chưa chọn khách hàng`}
                            </div>
                            {
                                chosenCustomer?.data && <>
                                    {isEdit ? (
                                        <button
                                            type="button"
                                            onClick={() => handleShowEdit(false)}
                                            className="btn bg_red mt-2 color_red font16 font_family_bold_italic px-4 mb-4"
                                        >
                                            Không cập nhật địa chỉ
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleShowEdit(true)}
                                            className="btn bg_primary mt-2 color_white font16 font_family_bold_italic px-4 mb-4"
                                        >
                                            Cập nhật địa chỉ
                                        </button>
                                    )}
                                </>
                            }
                            <Collapse in={isEdit}>
                                <div>
                                    <div className="font_family_bold_italic font14">City</div>
                                    <Select
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
                                        placeholder="Choose City"
                                        onChange={(value) => handleChooseCity(value)}
                                        options={options}
                                    />
                                    <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                        {errors.city?.message}
                                    </div>
                                    <div className="font_family_bold_italic font14 mt-4">
                                        District
                                    </div>
                                    <Select
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
                                        placeholder="Choose District"
                                        onChange={(value) => handleChooseDistrict(value)}
                                        options={options2}
                                    />
                                    <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                        {errors.district?.message}
                                    </div>
                                    <div className="font_family_bold_italic font14 mt-4">Ward</div>
                                    <Select
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
                                        placeholder="Choose Ward"
                                        onChange={(value) => handleChooseWard(value)}
                                        options={options3}
                                    />
                                    <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                        {errors.ward?.message}
                                    </div>
                                    <div className="font_family_bold_italic font14 mt-4">
                                        Street
                                    </div>
                                    <input
                                        className="mt-2 h40_px w100_per"
                                        {...register("street")}
                                        placeholder="Type street"
                                        type="text"
                                    />
                                    <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                        {errors.street?.message}
                                    </div>
                                </div>
                            </Collapse>
                            {/* <div className="font_family_bold_italic font14">Tỉnh/Thành phố</div>
                        <Select
                            value={options.filter(option => option.label === city)}
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
                            placeholder="Chọn tỉnh/thành phố"
                            onChange={(value) => handleChooseCity(value)}
                            options={options}
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.city?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Quận/Huyện</div>
                        <Select
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
                            placeholder="Chọn quận/huyện"
                            onChange={(value) => handleChooseDistrict(value)}
                            options={options2}
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.district?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Xã/Phường</div>
                        <Select
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
                            placeholder="Chọn phường/xã"
                            onChange={(value) => handleChooseWard(value)}
                            options={options3}
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.ward?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Đường</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("street")}
                            placeholder="Nhập đường"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.street?.message}
                        </div> */}
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
                        disabled={Boolean(!chosenCustomer?.data)}
                        type="submit"
                        className="btn bg_primary p-2 font20 font_family_bold color_white"
                    >
                        Cập nhật thông tin
                    </button>
                </div>
            </form>
            <ModalListObject onChangePage={(e: any) => setPage(e)} handleFilter={(e: any) => setPhone(e)} page={page} handleClose={handleCloseModal} chosenData={chosenCustomer} data={dataModal} header={header} onChoose={handleChoose} />
        </>
    );
}

export default UpdateCustomer;