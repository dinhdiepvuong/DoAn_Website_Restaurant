import { Icon } from '@iconify/react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Nav, Sidenav } from 'rsuite';
import styled from 'styled-components';
import { MenuType } from '../../interfaces';
import sidebarConfig from "../../layouts/sidebarConfig";

const Wrapper = styled.div`
    width: 270px;

    rs-sidenav-nav {
        margin: 0px;
    }

    .rs-sidenav-body {
        background:  #8cebc7;
    }

    .rs-sidenav-item {
        background-color:  #8cebc7;
        padding-left: 10px;
    }
    .rs-sidenav-nav>.rs-dropdown .rs-dropdown-toggle {
        padding-left: 10px;
    }
    
    .rs-dropdown-item {
        padding-left: 40px;
    }
`

const NavMenuTitle = ({ menu }: { menu: MenuType }) => {
    const { pathname } = useLocation();

    return (
        <div className='d-flex align-items-center'>
            <Icon className={`icon20x20 ${pathname.includes(menu.path) ? `color_primary` : `color_888`}`} icon={menu.icon} />
            <div className={`ml_10px font16 font_family_bold ${pathname.includes(menu.path) ? `color_primary` : `color_888`}`}>{menu.name}</div>
        </div>
    )
}

function SidebarNav() {
    const { pathname } = useLocation();

    return (
        <Wrapper>
            <Sidenav appearance='default'>
                <Sidenav.Body>
                    <Nav>
                        {
                            sidebarConfig.map((menu: MenuType, index: number) => (
                                <>
                                    {
                                        index === 0 ?
                                            <Nav.Item>
                                                <Link className='d-flex align-items-center' to={menu.path}>
                                                    <Icon className={`icon20x20 ${menu.path.includes(pathname) ? `color_primary` : `color_888`}`} icon={menu.icon} />
                                                    <div className={`ml_10px font16 font_family_bold ${menu.path.includes(pathname) ? `color_primary` : `color_888`}`}>{menu.name}</div>
                                                </Link>
                                            </Nav.Item>
                                            :
                                            <Nav.Menu eventKey={`${index}`} title={<NavMenuTitle menu={menu} />} >
                                                {
                                                    (menu.child || []).map((item: any, indexChild: number) => (

                                                        <Nav.Item eventKey={`${index}-${indexChild}`}>
                                                            <Link to={item.path}>
                                                                <div className={`font16 font_family_bold ${item.path.includes(pathname) ? `color_primary` : `color_888`}`}>{item.name}</div>
                                                            </Link>
                                                        </Nav.Item>


                                                    ))
                                                }
                                            </Nav.Menu>
                                    }
                                </>
                            ))
                        }
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Wrapper>
    )
}

export default React.memo(SidebarNav);