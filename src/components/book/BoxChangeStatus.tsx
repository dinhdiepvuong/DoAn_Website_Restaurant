import React from 'react'
import styled from 'styled-components';
import { ORDER_STATUS } from '../../utils';

const Wrapper = styled.div<{ isShow: boolean }>`
    opacity: ${p => p.isShow ? `1` : `0`};
    width: 150px;
    pointer-events: ${p => p.isShow ? `all` : `none`};
    position: absolute;
    left: 0px;
    z-index: 10;
    background-color: #fff;
    border-radius: 5px;

    transition: all 0.5s ease;

    .item {
        &:hover {
            background-color: #ddd
        }
    }
`

type BoxChangeStatusProps = {
    isShow: boolean;
    status: number;
    onClick: (e: any) => void;
}

function BoxChangeStatus({ isShow, status, onClick }: BoxChangeStatusProps) {
    const data = [
        {
            value: ORDER_STATUS.NOT_USE,
            name: "Chưa sử dụng"
        },
        {
            value: ORDER_STATUS.USING,
            name: "Đang sử dụng"
        },
    ];

    const isDisable = (item: any) => item.value <= status;

    return (
        <Wrapper className='box_shadow_dropdown' isShow={isShow}>
            {
                data.map((item, index: number) =>
                    <div style={{ cursor: `${isDisable(item) ? `not-allowed` : `pointer`}` }} onClick={() => !isDisable(item) && onClick(item?.value)} className={`item font14 p-2 font_family_bold ${status === item.value ? `color_primary` : ``}`}>
                        {item?.name}
                    </div>)
            }
        </Wrapper>
    )
}

export default BoxChangeStatus