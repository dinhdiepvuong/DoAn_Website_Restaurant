import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MenuItem from "../components/sidebar/MenuItem";
import SidebarNav from "../components/sidebar/SidebarNav";
import themeSlice, { sidebarModeSelector } from "../redux/slices/themeSlice";
import { ICON, SIDE_BAR_MODE } from "../utils";
import sidebarConfig from "./sidebarConfig";

const Container = styled.div<{ isOpen: boolean }>`
  box-shadow: rgba(0, 0, 0, 0.12) 3px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: ${p => p.isOpen ? `300px` : `60px`};
  background-color:  #8cebc7;
  max-height: calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  overflow: auto;
  position: fixed;
  top: 80px;
  padding: 30px 15px;

  transition: all 0.5s ease;

  overflow-x: hidden;
`;

const ButtonChangeMode = styled.button`
  margin-bottom: 20px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  z-index: 1000;
  right: 0px;
  top: -20px;
`

const CIcon = styled(Icon) <{ isOpen: boolean }>`
  transition: all 0.5s ease;
  transform: rotate(${p => p.isOpen ? 180 : 0}deg);
`

function Sidebar() {
  const sidebarMode = useSelector(sidebarModeSelector);
  const dispatch = useDispatch();

  const handleChangeMode = () => {

    if (sidebarMode === SIDE_BAR_MODE.SMALL) dispatch(themeSlice.actions.updateSidebarMode(SIDE_BAR_MODE.LARGE));

    else dispatch(themeSlice.actions.updateSidebarMode(SIDE_BAR_MODE.SMALL));
  }
  dispatch(themeSlice.actions.updateSidebarMode(SIDE_BAR_MODE.LARGE))
  return (
    <Container id="sidebar" isOpen={Boolean(sidebarMode === SIDE_BAR_MODE.LARGE)}>
      {/* <div className="position-relative mb-4">
        <ButtonChangeMode onClick={handleChangeMode}>
          <CIcon isOpen={Boolean(sidebarMode === SIDE_BAR_MODE.LARGE)} icon={ICON.RIGHT} className="icon25x25" />
        </ButtonChangeMode>
      </div> */}

      {
        sidebarMode === SIDE_BAR_MODE.SMALL ?
          <>
            {sidebarConfig.map((menu, index) => (
              <MenuItem menu={menu} index={index} key={index} />
            ))}
          </>
          :
          <SidebarNav />
      }
    </Container>
  );
}

export default Sidebar;
