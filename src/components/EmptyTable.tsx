import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

type EmptyTableProps = {
    title: string;
    icon: string;
}

function EmptyTable({ icon, title }: EmptyTableProps) {
    return (
        <Wrapper>
            <Icon icon={icon} className="icon50x50" />
            <div className='mt-4 font16 font_family_bold_italic'>{title}</div>
        </Wrapper>
    )
}

export default EmptyTable