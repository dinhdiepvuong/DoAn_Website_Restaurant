import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import { Icon } from "@iconify/react";
import moment from "moment";
import BaseFileChosen from "../base/BaseFileChosen";
import location from "../utils/location";
import { Collapse } from "react-bootstrap";
import { saveImage } from "../utils/firebase";
import userSlice from "../redux/slices/employeeSlice";
import styled from "styled-components";
import { orangeColor, primaryColor, redColor } from "../theme";
import Avatar from "../components/Avatar";
import { genAddress, genGender, ICON } from "../utils";
import BoxAnalyticUserDetail from "../components/analytic/BoxAnalyticUserDetail";
import { currencyFormat, thousandFormat } from "../utils/format";
import { CustomerType, OrderType } from "../interfaces";
import BaseLoading2 from "../base/BaseLoading2";
import { findOneCustomer } from "../redux/slices/customerSlice";

const BoxLeftTop = styled.div`
  background-color: ${primaryColor};
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  height: 150px;
  padding-top: 30px;
`
const BoxLeftBottom = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 0px 0px 10px 10px;
`

const WrapperAvatar = styled.div`
  border-radius: 152px;
  width: 152px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  position: absolute;
  top: -90px;
  right: calc(50% - 75px);
`

const BoxRight = styled.div``

const BoxChangeAvatar = ({ isShow }: { isShow: boolean }): JSX.Element => {
  const Wrapper = styled.div<{ isShow: boolean }>`
    background-color: #000;
    opacity: ${p => p.isShow ? `0.5` : `0`};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    border-radius: 150px;

    position: absolute;

    transition: all 1s;
  `
  return (
    <Wrapper isShow={isShow}>
      <Icon icon={ICON.CAMERA} className="icon25x25 color_white" />
      <div className="color_white font14 font_family_bold_italic">Đổi ảnh đại diện</div>
    </Wrapper>
  )
}

function CustomerDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [customer, setCustomer] = useState<CustomerType | any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowChangeAvatar, setIsShowChangeAvatar] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initData = async (id: string) => {
      setIsLoading(true);

      try {
        const result = await dispatch(findOneCustomer(id)).unwrap();

        const { customer } = result?.data;

        setCustomer(customer);
      } catch (error: any) {
        navigate("/error");
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) initData(id);
  }, [dispatch, id]);

  return (
    <>
      {
        isLoading ? <BaseLoading2 />
          :
          <>
            <div className="font18 font_family_bold_italic">Thông tin khách hàng</div>
            <div className="row w100_per m-0 p-0 mt-4">
              <div className="col-12 col-lg-4">
                <BoxLeftTop>
                  <div className="font22 font_family_bold_italic color_white">{customer?.name}</div>
                </BoxLeftTop>
                <BoxLeftBottom className="box_shadow_card">
                  <div className="h150_px position-relative border_bottom_gray_1px d-flex align-items-center justify-content-end flex-column py-3">
                    <WrapperAvatar className="box_shadow_card">
                      <Avatar shape="circle" size={150} url={customer?.avatar} />
                    </WrapperAvatar>
                    <div className="font16 font_family_bold">
                      Số điện thoại
                    </div>
                    <div className="font14 font_family_italic">
                      {customer?.phone}
                    </div>
                  </div>
                  <div className="border_bottom_gray_1px py-3 d-flex align-items-center justify-content-end flex-column">
                    <div className="font16 font_family_bold">
                      Giới tính
                    </div>
                    <div className="font14 font_family_italic">
                      {genGender(customer?.gender)}
                    </div>
                    <div className="font16 font_family_bold mt-4">
                      Email
                    </div>
                    <div className="font14 font_family_italic">
                      {customer?.email}
                    </div>
                    <div className="font16 font_family_bold mt-4">
                      Ngày sinh
                    </div>
                    <div className="font14 font_family_italic">
                      {moment(customer?.birthday).format(`DD/MM/YYYY`)}
                    </div>
                  </div>
                  <div className="py-3 d-flex align-items-center justify-content-end flex-column">
                    <div className="font16 font_family_bold">
                      Địa chỉ
                    </div>
                    <div className="font14 font_family_italic text-center">
                      {genAddress(customer?.address)}
                    </div>
                  </div>
                </BoxLeftBottom>
              </div>
              <div className="col-12 col-lg-8 px-4">
                <div className="bg_white border_radius_10 p-2 box_shadow_card">
                  <div className="font16 font_family_bold_italic">Thông tin đặt bàn</div>
                  <div className="divider_vertical_solid my-2"></div>
                  <div className="row p-0 m-0">
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={currencyFormat(100000)} title="TỔNG TIỀN" color={primaryColor} />
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={thousandFormat(100)} title="ĐƠN ĐẶT BÀN" color={orangeColor} />
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={thousandFormat(100)} title="HOÁ ĐƠN" color={redColor} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

      }
    </>
  )
}

export default CustomerDetail;

// const schema = yup.object({
//   name: yup.string().required("Name is required"),
//   email: yup.string().required("Email is required"),
//   phone: yup.string().required("Phone is required"),
//   city: yup.string().required("City is required"),
//   district: yup.string().required("District is required"),
//   ward: yup.string().required("Ward is required"),
//   street: yup.string().required("Street is required"),
// });
// function UpdateUser() {
//   const { id } = useParams();
//   const chooseAvatarRef = useRef<HTMLInputElement>(null);
//   const [user, setUser] = useState<UserType>();
//   const [birthday, setBirthday] = useState<any>();
//   const [avatar, setAvatar] = useState<any[]>([]);
//   const [newAvatar, setNewAvatar] = useState<any[]>([]);
//   const [errorImage, setErrorImage] = useState<string>("");
//   const [options, setOptions] = useState<any[]>([]);
//   const [options2, setOptions2] = useState<any[]>([]);
//   const [options3, setOptions3] = useState<any[]>([]);
//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const getUser = async (id: string) => {
//     try {
//       const result = await getUserById({}, {}, {}, id);
//       if (result) {
//         setUser(result);
//         setValue("name", result.name);
//         setValue("email", result.email);
//         setValue("phone", result.phone);
//         setValue("city", result.address.city);
//         setValue("district", result.address.district);
//         setValue("ward", result.address.ward);
//         setValue("street", result.address.street);
//         setBirthday(result.birthday ? result.birthday : new Date());
//         setAvatar([result.avatar]);
//       } else {
//         navigate("/users");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (id) {
//       getUser(id);
//     }
//   }, [id]);
//   const onSubmit = (data: any) => {
//     if (avatar.length === 0 && newAvatar.length === 0)
//       setErrorImage("Must choose avatar");
//     else {
//       dispatch(
//         themeSlice.actions.showBackdrop({
//           isShow: true,
//           content: "",
//         })
//       );
//       setErrorImage("");
//       const newUser = {
//         ...user,
//         name: data.name,
//         email: data.email,
//         phone: data.phone,
//         birthday: birthday,
//         address: {
//           city: data.city,
//           district: data.district,
//           ward: data.ward,
//           street: data.street,
//         },
//       };
//       saveUser(newUser);
//     }
//   };
//   const saveUser = async (user: any) => {
//     let avatarUrl = user.avatar;
//     if (newAvatar.length > 0)
//       avatarUrl = await saveImage("users", newAvatar[0]);
//     const body = {
//       ...user,
//       avatar: avatarUrl,
//     };
//     const result = await updateUser({}, body, {});
//     if (result) {
//       dispatch(
//         userSlice.actions.updateUser({
//           ...result,
//           role: user.role,
//         })
//       );
//       dispatch(
//         themeSlice.actions.hideBackdrop({
//           isShow: false,
//           content: "",
//         })
//       );
//       dispatch(
//         themeSlice.actions.showToast({
//           content: "Successfully update User",
//           type: "success",
//         })
//       );
//       navigate("/users");
//     }
//   };
//   const handleDeleteAvatar = (position: number) => {
//     setAvatar([]);
//   };
//   const handleDeleteNewAvatar = (position: number) => {
//     setNewAvatar([]);
//   };
//   const onChooseAvatar = (e: any) => {
//     const file = e.target.files[0];
//     setNewAvatar([file]);
//     setAvatar([]);
//   };
//   const handleShowEdit = (status: boolean) => {
//     setIsEdit(status);
//     if (!status) {
//       setValue("city", user?.address.city);
//       setValue("district", user?.address.district);
//       setValue("ward", user?.address.ward);
//       setValue("street", user?.address.street);
//       setOptions([]);
//       setOptions2([]);
//       setOptions3([]);
//     } else {
//       setValue("city", "");
//       setValue("district", "");
//       setValue("ward", "");
//       setValue("street", "");
//       const data: any[] = [];
//       location.forEach((item: any) =>
//         data.push({
//           value: item,
//           label: item.name,
//         })
//       );
//       setOptions(data);
//     }
//   };
//   const handleChooseCity = (value: any) => {
//     setValue("city", value.label);
//     const data: any[] = [];
//     value.value.districts.forEach((district: any) => {
//       data.push({
//         label: district.name,
//         value: district,
//       });
//     });
//     setOptions2(data);
//     setOptions3([]);
//   };
//   const handleChooseDistrict = (value: any) => {
//     setValue("district", value.label);
//     const data: any[] = [];
//     value.value.wards.forEach((ward: any) => {
//       data.push({
//         label: `${ward.prefix} ${ward.name}`,
//         value: ward,
//       });
//     });
//     setOptions3(data);
//   };
//   const handleChooseWard = (value: any) => {
//     setValue("ward", value.label);
//   };
//   if (!user) return null;
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="font20 font_family_bold mt-2">Update User</div>
//         <div className="my-4 divider_vertical_dashed"></div>
//         <div className="row p-0 m-0 mt-4">
//           <div className="col-12 col-lg-4 mt-2">
//             <div className="font18 font_family_bold">Information</div>
//             <div className="font14 font_family_regular mt-2 color_888">
//               Add user's basic information
//             </div>
//           </div>
//           <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
//             <div className="font_family_bold_italic font14">Name</div>
//             <input
//               className="mt-2 h40_px w100_per"
//               {...register("name")}
//               placeholder="Type name"
//               type="text"
//             />
//             <div className="mt-2 font12 ml_5px color_red font_family_italic">
//               {errors.name?.message}
//             </div>
//             <div className="font_family_bold_italic font14 mt-4">Email</div>
//             <input
//               className="mt-2 h40_px w100_per"
//               {...register("email")}
//               placeholder="Type email"
//               type="text"
//             />
//             <div className="mt-2 font12 ml_5px color_red font_family_italic">
//               {errors.email?.message}
//             </div>
//             <div className="font_family_bold_italic font14 mt-4">Phone</div>
//             <input
//               className="mt-2 h40_px w100_per"
//               {...register("phone")}
//               placeholder="Type phone"
//               type="text"
//             />
//             <div className="mt-2 font12 ml_5px color_red font_family_italic">
//               {errors.phone?.message}
//             </div>
//             <div className="font_family_bold_italic font14 mt-4">
//               Date of birth
//             </div>
//             <DatePicker
//               maxDate={new Date()}
//               customInput={
//                 <input
//                   className="mt-2 h40_px w100_per"
//                   placeholder="Type phone"
//                   type="text"
//                 />
//               }
//               selected={new Date(birthday)}
//               dateFormat="dd/MM/yyyy"
//               onChange={(newValue: Date) => {
//                 setBirthday(newValue);
//               }}
//             />
//             <div className="font_family_bold_italic font14 mt-4">Avatar</div>
//             <div
//               onClick={() => chooseAvatarRef.current?.click()}
//               className="choose_image_large cursor_pointer py-2 d-flex align-items-center flex-column mt-2"
//             >
//               <Icon
//                 className="color_888 icon30x30"
//                 icon="bi:cloud-arrow-up-fill"
//               />
//               <div className="font_family_regular">
//                 <span className="color_primary">Upload an image</span> or drag
//                 and drop
//               </div>
//               <div className="font_family_italic font12 mt-2">PNG, JPG</div>
//             </div>
//             <div className="d-flex flex-wrap mt-2">
//               {avatar.map((item: any, index: any) => (
//                 <BaseFileChosen
//                   file={false}
//                   close={handleDeleteAvatar}
//                   index={index}
//                   key={index}
//                   image={item}
//                 />
//               ))}
//               {newAvatar.map((item: any, index: any) => (
//                 <BaseFileChosen
//                   file={true}
//                   close={handleDeleteNewAvatar}
//                   index={index}
//                   key={index}
//                   image={item}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="my-4 divider_vertical_dashed"></div>
//         <div className="row p-0 m-0 mt-4">
//           <div className="col-12 col-lg-4 mt-2">
//             <div className="font18 font_family_bold">Address</div>
//             <div className="font14 font_family_regular mt-2 color_888">
//               Choose user's address
//             </div>
//           </div>
//           <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
//             <div className="font_family_bold_italic font14">Address</div>
//             <div className="font16 font_family_italic mt-2">{`${user.address.street}, ${user.address.ward}, ${user.address.district}, ${user.address.city}`}</div>
//             {isEdit ? (
//               <button
//                 type="button"
//                 onClick={() => handleShowEdit(false)}
//                 className="btn bg_red mt-2 color_red font16 font_family_bold_italic px-4"
//               >
//                 Don't Edit
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => handleShowEdit(true)}
//                 className="btn bg_primary mt-2 color_white font16 font_family_bold_italic px-4"
//               >
//                 Edit
//               </button>
//             )}

//             <Collapse in={isEdit}>
//               <div className="mt-4">
//                 <div className="font_family_bold_italic font14">City</div>
//                 <Select
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: "40px",
//                       marginTop: "8px",
//                     }),
//                   }}
//                   theme={(theme) => ({
//                     ...theme,
//                     colors: {
//                       ...theme.colors,
//                       primary25: "#ddd",
//                       primary50: "#ddd",
//                       primary: "rgba(0,159,127)",
//                     },
//                   })}
//                   placeholder="Choose City"
//                   onChange={(value) => handleChooseCity(value)}
//                   options={options}
//                 />
//                 <div className="mt-2 font12 ml_5px color_red font_family_italic">
//                   {errors.city?.message}
//                 </div>
//                 <div className="font_family_bold_italic font14 mt-4">
//                   District
//                 </div>
//                 <Select
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: "40px",
//                       marginTop: "8px",
//                     }),
//                   }}
//                   theme={(theme) => ({
//                     ...theme,
//                     colors: {
//                       ...theme.colors,
//                       primary25: "#ddd",
//                       primary50: "#ddd",
//                       primary: "rgba(0,159,127)",
//                     },
//                   })}
//                   placeholder="Choose District"
//                   onChange={(value) => handleChooseDistrict(value)}
//                   options={options2}
//                 />
//                 <div className="mt-2 font12 ml_5px color_red font_family_italic">
//                   {errors.district?.message}
//                 </div>
//                 <div className="font_family_bold_italic font14 mt-4">Ward</div>
//                 <Select
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: "40px",
//                       marginTop: "8px",
//                     }),
//                   }}
//                   theme={(theme) => ({
//                     ...theme,
//                     colors: {
//                       ...theme.colors,
//                       primary25: "#ddd",
//                       primary50: "#ddd",
//                       primary: "rgba(0,159,127)",
//                     },
//                   })}
//                   placeholder="Choose Ward"
//                   onChange={(value) => handleChooseWard(value)}
//                   options={options3}
//                 />
//                 <div className="mt-2 font12 ml_5px color_red font_family_italic">
//                   {errors.ward?.message}
//                 </div>
//                 <div className="font_family_bold_italic font14 mt-4">
//                   Street
//                 </div>
//                 <input
//                   className="mt-2 h40_px w100_per"
//                   {...register("street")}
//                   placeholder="Type street"
//                   type="text"
//                 />
//                 <div className="mt-2 font12 ml_5px color_red font_family_italic">
//                   {errors.street?.message}
//                 </div>
//               </div>
//             </Collapse>
//           </div>
//         </div>
//         <div className="my-4 divider_vertical_dashed"></div>
//         <div className="row p-0 m-0 mt-4">
//           <div className="col-12 col-lg-4 mt-2">
//             <div className="font18 font_family_bold">Authorization</div>
//             <div className="font14 font_family_regular mt-2 color_888">
//               Type username and password
//             </div>
//           </div>
//           <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
//             <div className="font_family_bold_italic font14 mt-4">Username</div>
//             <input
//               value={user.username}
//               disabled
//               className="mt-2 h40_px w100_per"
//               placeholder="Type username"
//               type="text"
//             />
//             <div className="font_family_bold_italic font14 mt-4">Password</div>
//             <input
//               value={"1234567890098"}
//               disabled
//               className="mt-2 h40_px w100_per"
//               placeholder="Type password"
//               type="password"
//             />
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col-12 col-lg-4"></div>
//           <div
//             className={`col-12 col-lg-8 border_radius_5 py-2 px-4 color_red ${
//               errorImage.length > 0 ? `bg_red` : `d-none`
//             }`}
//           >
//             {errorImage}
//           </div>
//         </div>
//         <div className="mt-4 d-flex justify-content-end">
//           <button
//             type="submit"
//             className="btn bg_primary font14 font_family_bold color_white"
//           >
//             Update User
//           </button>
//         </div>
//       </form>
//       <input
//         hidden
//         ref={chooseAvatarRef}
//         type="file"
//         onClick={(e: any) => {
//           e.target.value = null;
//         }}
//         accept=".png, .jpg"
//         onChange={onChooseAvatar}
//       />
//     </>
//   );
// }

// export default React.memo(UpdateUser);
