import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useShowToast from "../hooks/useShowToast";
import BaseBackdrop from "../base/BaseBackdrop";
import BaseLoading from "../base/BaseLoading";
import { useSelector } from "react-redux";
import { sidebarModeSelector } from "../redux/slices/themeSlice";
import { SIDE_BAR_MODE } from "../utils";

const ContainerPage = styled.div<{ isOpen: boolean }>`
  margin-top: 80px;
  margin-left: ${p => p.isOpen ? `300px` : `60px`};
  background: rgba(243, 244, 246);
  padding: 20px;
  min-height: calc(100vh - 80px);

  transition: all 0.5s ease;
`;
function Layout() {
  const sidebarMode = useSelector(sidebarModeSelector);

  useShowToast();

  return (
    <>
      <Navbar />
      <Sidebar />
      <ToastContainer />
      <BaseBackdrop />
      <BaseLoading />
      <ContainerPage isOpen={sidebarMode === SIDE_BAR_MODE.LARGE}>
        <Outlet />
      </ContainerPage>
    </>
  );
}

export default React.memo(Layout);
