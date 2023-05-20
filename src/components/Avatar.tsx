import React from "react";
import styled from "styled-components";

type Props = {
  url: string | any;
  shape: string;
  size: number;
  cursor?: string;
  click?: () => void;
};
function Avatar({ url, shape = "circle", size, cursor, click }: Props) {
  const Container = styled.img`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${shape === "circle" ? size : 10}px;
    object-fit: cover;
    cursor: ${cursor};
  `;
  return <Container className="border_gray_1px" src={url} onClick={click} />;
}

export default React.memo(Avatar);
