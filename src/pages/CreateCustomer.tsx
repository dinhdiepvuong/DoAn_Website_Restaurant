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
import userSlice from "../redux/slices/employeeSlice";
import { useNavigate } from "react-router-dom";
import orderSlice from "../redux/slices/orderSlice";
import UploadImage from "../components/UploadImage";
import BoxRadio from "../components/BoxRadio";
import { dataGender, GENDER } from "../utils";
import { createCustomer } from "../redux/slices/customerSlice";

const schema = yup.object({
  name: yup.string().required("Họ tên khách hàng trống"),
  email: yup.string().required("Email trống").email("Email không hợp lệ"),
  phoneNumber: yup.string().required("Số điện thoại trống").matches(/^0[0-9]{8,10}/, "Số điện thoại không hợp lệ"),
  city: yup.string().required("Tỉnh/Thành phố trống"),
  identity: yup.string(),
  district: yup.string().required("Quận/Huyện trống"),
  ward: yup.string().required("Phường/Xã trống"),
  street: yup.string().required("Đường trống"),
});

function CreateCustomer() {
  const [birthday, setBirthday] = useState<Date>(new Date(2000, 9, 8));
  const [options, setOptions] = useState<any[]>([]);
  const [options2, setOptions2] = useState<any[]>([]);
  const [options3, setOptions3] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorImage, setErrorImage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [gender, setGender] = useState<number>(GENDER.MALE);

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

      const customer = {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        address: {
          city: data.city,
          district: data.district,
          ward: data.ward,
          street: data.street,
        },
        identity: data.identity,
        birthday: birthday,
        gender
      };

      saveCustomer(customer);
    }
  };

  const saveCustomer = async (customer: any) => {
    try {
      const avatarUrl = await saveImage("customers", avatar[0]);
      const body = {
        ...customer,
        avatar: avatarUrl,
      };

      const result = await dispatch(createCustomer(body)).unwrap();

      dispatch(
        themeSlice.actions.showToast({
          content: "Thêm khách hàng thành công",
          type: "success",
        })
      );

      navigate("/users/list");
    } catch (error) {
      dispatch(
        themeSlice.actions.showToast({
          content: "Thêm khách hàng thất bại",
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font25 font_family_bold mt-2 d-flex justify-content-center">Thêm khách hàng mới</div>
        <div className="my-4 divider_vertical_dashed"></div>
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
                {...register("phoneNumber")}
                placeholder="Nhập số điện thoại"
                type="text"
              />
              <div className="mt-2 font12 ml_5px color_red font_family_italic">
                {errors.phoneNumber?.message}
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
          <div className="col-12 col-lg-6 p-0 m-0 mt-4">
            <div className="col-12 col-lg-12 mt-2 mb-3">
              <div className="font18 font_family_bold">Địa chỉ</div>
              <div className="font14 font_family_regular mt-2 color_888">
                Chọn địa chỉ của khách hàng
              </div>
            </div>
            <div className="col-12 col-lg-11   bg_white box_shadow_card border_radius_5 p-4">
              <div className="font_family_bold_italic font14">Tỉnh/Thành phố</div>
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
              </div>
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
            className="btn bg_primary p-2 font20 font_family_bold color_white"
          >
            Thêm khách hàng
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCustomer;
