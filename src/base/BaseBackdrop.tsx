import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { backdropSelector } from "../redux/slices/themeSlice";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  opacity: 0.6;
`;
function BaseBackdrop() {
  const backdrop = useSelector(backdropSelector);
  useEffect(() => {
    if (backdrop.isShow) {
      document.body.classList.add("enable_backdrop");
    } else {
      document.body.classList.remove("enable_backdrop");
    }
  }, [backdrop]);
  return (
    <Container className={backdrop.isShow ? "d-block" : `d-none`}>
      
    </Container>
  );
}

export default React.memo(BaseBackdrop);
