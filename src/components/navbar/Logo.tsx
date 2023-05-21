import React from "react";
import styled from "styled-components";
import { primaryColor } from "../../theme";

type Props = {
  url?: string;
}
const Name = styled.a`
  color: ${primaryColor};
  &:hover {
    color: ${primaryColor};
  }
`;
function Logo({ url }: Props) {
  return (
    <Name
      href="#"
      className="cursor_pointer"
    >
      <img src={url} style={{ width: '48px', height: '48px' }} alt="logo" />
    </Name>
  );
}

export default React.memo(Logo);
