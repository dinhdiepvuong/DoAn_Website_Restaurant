import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";

type Props = {
  image: any;
  close: (index: number) => void;
  index: number;
  file: boolean;
};
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: contain;
`;
function BaseFileChosen({ image, close, index, file }: Props) {
  return (
    <div className="position-relative mr_5px">
      {typeof image !== "string" ? (
        <Image src={URL.createObjectURL(image)} alt="" />
      ) : (
        <Image src={image} alt="" />
      )}
      <div
        onClick={() => close(index)}
        className="cursor_pointer position-absolute top0 right0 mr_5px"
      >
        <Icon
          className="color_red icon20x20 bg_white border_radius_20"
          icon="ant-design:close-circle-filled"
        />
      </div>
    </div>
  );
}

export default React.memo(BaseFileChosen);
