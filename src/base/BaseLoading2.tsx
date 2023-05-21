import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 40%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  z-index: 1000;
`

type Props = {
  top?: string;
  display?: string;
  align?: string;
  justify?: string;
  url?: string;
  size?: string;
  flex?: string;
};

function BaseLoading2({
  top = "",
  url = require("../assets/images/rolling.gif"),
  align = "",
  display = "",
  justify = "",
  size = "100px",
  flex = "flex-column",
}: Props) {
  return (
    <>
      <Wrapper className={classNames(top, align, justify, display, flex)}>
        <img style={{ width: size, height: size}} src={url} alt="Loading" />
        <div className="font20 font_family_bold">Đang tải...</div>
      </Wrapper>
    </>
  );
}

export default BaseLoading2;
