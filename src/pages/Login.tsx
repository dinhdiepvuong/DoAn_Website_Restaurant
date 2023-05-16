import { Icon } from "@iconify/react";
import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../components/navbar/Logo";
import { grayColor } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { authAuthSelector, loginAdmin } from "../redux/slices/authSlice";

const Container = styled.form`
  background-image: url('https://www.thedailymeal.com/img/gallery/the-2-plate-rules-you-should-follow-at-fine-dining-restaurants/l-intro-1670452199.jpg');
  min-width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const schema = yup.object({
  username: yup.string().required("Tên đăng nhập không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

function Login() {
  const auth = useSelector(authAuthSelector);

  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("rememberMe") ? true : false
  );
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (auth?.isLogin) {
      navigate("/");
    }
  }, [auth?.isLogin]);

  const onSubmit = (data: any) => {
    console.log('data', data);
    handleLogin(data);
  };
  const handleLogin = async (body: any) => {
    try {
      const result = await dispatch(loginAdmin(body)).unwrap();

      const { admin } = result?.data;

      if (admin) {
        setError("");
        navigate("/");
        localStorage.setItem("adminId", admin?.id);
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không hợp lệ!");
      }
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không hợp lệ!");
    }

  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div className="box_shadow_card box_login">
        <Logo url="https://png.pngtree.com/template/20200704/ourmid/pngtree-restaurant-logo-design-vector-template-image_388753.jpg" />
        <div className="mt-3 font20 font_family_bold_italic color_back">
          Đăng nhập vào Quản lý
        </div>
        <div className="w100_per mt-4">
          <div className="font18 font_family_bold_italic">Tên đăng nhập</div>
          <input
            {...register("username")}
            type="text"
            placeholder="Nhập vào tên đăng nhập của bạn"
            className="mt-2 w100_per h50_px"
          />
          <div className="mt-2 font14 font_family_italic color_red">
            {errors.username?.message}
          </div>
          <div className="mt-4 font18 font_family_bold_italic">Mật khẩu</div>
          <div className="position-relative d-flex align-items-center">
            <input
              {...register("password")}
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập vào mật khẩu của bạn"
              className="mt-2 w100_per h50_px pr_20px"
            />
            <button
              onClick={() => setIsShowPassword(!isShowPassword)}
              type="button"
              className="btn position-absolute p-0 mr_10px mt-1 right0"
            >
              <Icon
                icon={
                  !isShowPassword
                    ? "akar-icons:eye-open"
                    : "akar-icons:eye-slashed"
                }
                className="icon20x20 color_888"
              />
            </button>
          </div>
          <div className="mt-2 font14 font_family_italic color_red">
            {errors.password?.message}
          </div>
        </div>
        {/* <div className="mt-4 w100_per d-flex align-items-center">
          <input
            onChange={() => setRememberMe(!rememberMe)}
            checked={rememberMe}
            type="checkbox"
          />
          <span className="ml_10px font16 font_family_italic">Remember me</span>
        </div> */}
        <div className="mt-2 font14 font_family_italic color_red">{error}</div>
        <button
          type="submit"
          className="w100_per mt-4 bg_primary_btn color_white font20 font_family_italic"
        >
          Đăng nhập
        </button>
      </div>
    </Container>
  );
}

export default Login;
