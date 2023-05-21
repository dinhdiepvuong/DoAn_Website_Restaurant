import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import BoxProfile from "../components/BoxProfile";
import Logo from "../components/navbar/Logo";
import useClickOutSide from "../hooks/useClickOutside";
import { authAuthSelector } from "../redux/slices/authSlice";

const Container = styled.div`
  height: 80px;
  position: fixed;
  border-bottom: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  z-index: 100;
  top: 0px;
  background: #fff;
  width: 100%;
`;
function Navbar() {
  const notificationRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const auth = useSelector(authAuthSelector);
  const user = {
    avatar: 'https://www.foot01.com/img/images/1200x/2022/Sep/09/mercato-cristiano-ronaldo-a-chelsea-la-voie-est-enfin-libre-icon_spi_149_ay_man_utd_sociedad-350021.jpg'
  };
  const [isShowProfile, setIsProfile] = useState<boolean>(false);
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
  const handleShowBoxProfile = () => {
    setIsProfile(!isShowProfile);
  };
  const handleCloseProfile = () => {
    setIsProfile(false);
  };
  useClickOutSide(notificationRef, () => setIsShowNotification(false));

  // if (!user || !setting) return null;
  return (
    <Container className="d-flex align-items-center justify-content-between px-4">
      <Logo url="https://firebasestorage.googleapis.com/v0/b/restaurant-1a957.appspot.com/o/pngtree-restaurant-logo-design-vector-template-image_388753-removebg-preview.png?alt=media&token=cd438219-fc5d-481d-b2d4-0123e4760a9e" />
      <div className="font25 font_family_pacifico">Nhà hàng Vương Lập</div>
      <div className="position-relative d-flex align-items-center">
        {/* <div className="position-relative mr_20px"> */}
        {/* <button
            onClick={() => setIsShowNotification(!isShowNotification)}
            className="btn p-0"
          >
            <Badge content={1}>
              <Icon
                className="icon30x30 color_888"
                icon="ic:baseline-notifications-active"
              />
            </Badge>
          </button> */}
        {/* <div
            ref={notificationRef}
            className={classNames("box_notification", {
              show: isShowNotification,
            })}
          >
            <BoxNotification />
          </div> */}
        {/* </div> */}
        <Avatar
          click={handleShowBoxProfile}
          cursor="pointer"
          shape="circle"
          url={auth?.user ? auth?.user?.avatar : "https://www.foot01.com/img/images/1200x/2022/Sep/09/mercato-cristiano-ronaldo-a-chelsea-la-voie-est-enfin-libre-icon_spi_149_ay_man_utd_sociedad-350021.jpg"}
          size={50}
        />
        <BoxProfile
          user={user}
          close={handleCloseProfile}
          show={isShowProfile}
        />
      </div>
    </Container>
  );
}

export default Navbar;
