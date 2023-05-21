import React from 'react'
import { Link, useLocation } from 'react-router-dom';

type MenuItemChildProps = {
    item: any;
}

function MenuItemChild({ item }: MenuItemChildProps) {
    const { pathname } = useLocation();

    return (
        <Link to={item.path}>
            <div className={`d-flex align-items-center ${pathname.includes(item.path) ? `color_primary` : `color_888`} cursor_pointer menu_item font16 font_family_bold_italic`}>{item.name}</div>
        </Link>
    )
}

export default MenuItemChild