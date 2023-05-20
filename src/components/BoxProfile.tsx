import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useClickOutSide from "../hooks/useClickOutside";
import authSlice, { authAuthSelector } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { primaryHoverColor } from "../theme";

type Props = {
  show: boolean;
  close: () => void;
  user: any;
};
const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: #fff;
  margin-top: 50px;
  width: 200px;
  .box_profile_item:hover a {
    color: ${primaryHoverColor} !important;
  }
`;
function BoxProfile({ close, show, user }: Props) {
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(authAuthSelector);

  useClickOutSide(profileRef, () => {
    close();
  });

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem("adminId");
    navigate("/login");
  };
  return (
    <Container
      ref={profileRef}
      className={`box_shadow_dropdown border_radius_5 ${show ? "show" : ""
        } box_profile`}
    >
      <div className="bg_primary py-2 px-3 border_radius_5">
        <div className="color_white font14 font_family_bold_italic">{auth?.user?.name}</div>
        <div className="font14 mt-1 color_white font_family_italic">
          {user?.name}
        </div>
      </div>
      <div className="py-2 px-3 cursor_pointer box_profile_item">
        <Link to="/admin/detail" className="font16 font_family_italic color_888">
          Thông tin cá nhân
        </Link>
      </div>
      <div className="py-2 px-3 cursor_pointer box_profile_item">
        <button
          type="button"
          onClick={handleLogout}
          className="btn m-0 p-0 font16 font_family_italic color_888"
        >
          Đăng xuất
        </button>
      </div>
    </Container>
  );
}

export default React.memo(BoxProfile);
