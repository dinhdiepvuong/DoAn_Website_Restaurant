import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { backdropSelector } from "../redux/slices/themeSlice";

const Container = styled.div`
  z-index: 101;
  top: calc(50vh - 40px);
  left: calc(50% - 30px);
`;
function BaseLoading() {
  const backdrop = useSelector(backdropSelector);
  return (
    <Container
      className={`position-fixed ${backdrop.isShow ? `d-block` : `d-none`}`}
    >
      <img src={require("../assets/images/loading.gif")} />
    </Container>
  );
}

export default React.memo(BaseLoading);
