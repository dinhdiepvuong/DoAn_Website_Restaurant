import React from 'react'

function CreatePaymentMethod() {
  return (
    <div>CreatePaymentMethod</div>
  )
}

export default CreatePaymentMethod

// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../redux/store";
// import { Icon } from "@iconify/react";
// import BaseFileChosen from "../base/BaseFileChosen";
// import Select from "react-select";
// import orderSlice, {
//   allPaymentMethodsSelector,
//   getApiAllPaymentMethods,
// } from "../redux/slices/orderSlice";
// import { saveImage } from "../utils/firebase";
// import { createPaymentMethod } from "../apis";
// import themeSlice from "../redux/slices/themeSlice";

// const schema = yup.object({
//   name: yup.string().required("Name is required"),
// });
// function CreatePaymentMethod() {
//   const chooseImageRef = useRef<HTMLInputElement>(null);
//   const allPaymentMethods = useSelector(allPaymentMethodsSelector);
//   const [parent, setParent] = useState<string>("");
//   const [image, setImage] = useState<any[]>([]);
//   const [options, setOptions] = useState<any[]>([]);
//   const [errorImage, setErrorImage] = useState<string>("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   useEffect(() => {
//     if (allPaymentMethods) {
//       const data: any[] = [];
//       allPaymentMethods.forEach((paymentMethod: any) => {
//         data.push({
//           value: paymentMethod.id,
//           label: paymentMethod.name,
//         });
//       });
//       setOptions(data);
//     }
//   }, [allPaymentMethods]);
//   const onSubmit = (data: any) => {
//     if (image.length === 0) setErrorImage("Must choose Image");
//     else {
//       dispatch(
//         themeSlice.actions.showBackdrop({
//           isShow: true,
//           content: "",
//         })
//       );
//       setErrorImage("");
//       const paymentMethod = {
//         name: data.name,
//         status: "active",
//         type: parent ? "child" : "parent",
//         parentId: parent ? parent : "",
//       };
//       savePaymentMethod(paymentMethod);
//     }
//   };
//   const savePaymentMethod = async (paymentMethod: any) => {
//     try {
//       const imageUrl = await saveImage("paymentMethods", image[0]);
//       const body = {
//         ...paymentMethod,
//         image: imageUrl,
//       };
//       console.log(body);
//       const result = await createPaymentMethod({}, body, {});
//       if (result) {
//         dispatch(getApiAllPaymentMethods());
//         dispatch(
//           themeSlice.actions.hideBackdrop({
//             isShow: false,
//             content: "",
//           })
//         );
//         dispatch(
//           themeSlice.actions.showToast({
//             content: "Successfully create Payment Method",
//             type: "success",
//           })
//         );
//         navigate("/payment-methods");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleDeleteImage = (position: number) => {
//     setImage([]);
//   };
//   const onChooseImage = (e: any) => {
//     setImage([e.target.files[0]]);
//   };
//   const handleChooseParent = (value: any) => {
//     setParent(value ? value.value : "");
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="font20 font_family_bold mt-2">
//           Create New Payment Method
//         </div>
//         <div className="my-4 divider_vertical_dashed"></div>
//         <div className="row p-0 m-0 mt-4">
//           <div className="col-12 col-lg-4 mt-2">
//             <div className="font18 font_family_bold">Description</div>
//             <div className="font14 font_family_regular mt-2 color_888">
//               Add your payment method description and necessary information from
//               here
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
//             <div className="font_family_bold_italic font14 mt-4">Parent</div>
//             <Select
//               styles={{
//                 control: (provided, state) => ({
//                   ...provided,
//                   height: "40px",
//                   marginTop: "8px",
//                 }),
//               }}
//               theme={(theme) => ({
//                 ...theme,
//                 colors: {
//                   ...theme.colors,
//                   primary25: "#ddd",
//                   primary50: "#ddd",
//                   primary: "rgba(0,159,127)",
//                 },
//               })}
//               isClearable
//               placeholder="Choose parent"
//               onChange={(value) => handleChooseParent(value)}
//               options={options}
//             />
//             <div className="font_family_bold_italic font14 mt-4">Image</div>
//             <div
//               onClick={() => chooseImageRef.current?.click()}
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
//               {image.map((item: any, index: any) => (
//                 <BaseFileChosen
//                   file={true}
//                   close={handleDeleteImage}
//                   index={index}
//                   key={index}
//                   image={item}
//                 />
//               ))}
//             </div>
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
//             Add Payment Method
//           </button>
//         </div>
//       </form>
//       <input
//         hidden
//         ref={chooseImageRef}
//         type="file"
//         onClick={(e: any) => {
//           e.target.value = null;
//         }}
//         accept=".png, .jpg"
//         onChange={onChooseImage}
//       />
//     </>
//   );
// }

// export default React.memo(CreatePaymentMethod);
