import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components'
import { ICON } from '../../utils';

const Wrapper = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;

    display: flex;
    justify-content: space-between;
`

type BoxAnalyticUserDetailProps = {
    title: string;
    value: string;
    color: string;
    icon?: string;
}

function BoxAnalyticUserDetail({ color, title, value, icon = ICON.ANALYTIC }: BoxAnalyticUserDetailProps) {
    return (
        <Wrapper className='box_shadow_card'>
            <div>
                <div className='font16 font_family_bold_italic'>{title}</div>
                <div className='font16 mt-4'>{value}</div>
            </div>
            <div className='d-flex align-items-end'>
                <Icon className='icon50x50' style={{ color: color }} icon={icon} />
            </div>
        </Wrapper>
    )
}

export default BoxAnalyticUserDetail