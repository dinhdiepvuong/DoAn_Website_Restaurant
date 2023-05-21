import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { MenuType } from "../../interfaces";
import { primaryHoverColor } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import { Popover, Tooltip, Whisper } from "rsuite";
import MenuItemChild from "./MenuItemChild";

type Props = {
  menu: MenuType;
  index: number;
};
const Container = styled.div`
  &:hover {
  color: ${primaryHoverColor};
}
`

const CPopover = styled(Popover)`
  .rs-popover-title {
    font-size: 16px !important;
  }
`

const tooltip = (name: any) => (
  <Tooltip style={{ fontSize: '14px' }}>{name}</Tooltip>
)

const popover = (menu: MenuType) => (
  <CPopover title={menu?.name} style={{ width: 200 }}>
    {
      (menu.child || []).map((item: any, index: number) => <MenuItemChild item={item} key={`${index}`}></MenuItemChild>)
    }
  </CPopover>
);

function MenuItem({ menu, index }: Props) {
  const { pathname } = useLocation();

  return (
    <>
      {
        index === 0 ?
          <Link to={menu.path}>
            <Whisper trigger={["hover"]} placement="topStart" speaker={tooltip(menu.name)}>
              <Container className={`d-flex align-items-center ${pathname.includes(menu.path) ? `color_primary` : `color_888`} cursor_pointer menu_item mb-4`}>
                <Icon className="icon25x25" icon={menu.icon} />
              </Container>
            </Whisper>
          </Link>
          :
          <Whisper trigger={"click"} enterable placement="rightStart" speaker={popover(menu)}>
            <Container className={`d-flex align-items-center ${pathname.includes(menu.path) ? `color_primary` : `color_888`} cursor_pointer menu_item mb-4`}>
              <Icon className="icon25x25" icon={menu.icon} />
            </Container>
          </Whisper>
      }
    </>

  );
}

export default React.memo(MenuItem);
