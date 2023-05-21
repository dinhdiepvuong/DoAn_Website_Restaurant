import React from "react";
import Switch from "react-switch";

type Props = {
  checked: boolean;
  handleOn: (data?: any) => void;
  handleOff: (data?: any) => void;
};
function BaseSwitch({ checked, handleOn, handleOff }: Props) {
  return (
    <Switch
      height={20}
      width={48}
      handleDiameter={25}
      onHandleColor="#fff"
      offHandleColor="#ddd"
      checked={checked}
      onChange={(value) => {
        if (value) handleOn();
        else handleOff();
      }}
    />
  );
}

export default React.memo(BaseSwitch);
