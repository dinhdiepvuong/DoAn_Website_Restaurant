import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { primaryColor } from '../../theme';
import { currencyFormat, thousandFormat } from '../../utils/format';

const Wrapper = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background: #fff;
 `
const IconUser = styled(Icon)`
    width: 100px;
    height: 100px;
    color: ${primaryColor}
`
const Title = styled.div`
    color: gray;
    font-size: 20px;
`
const Value = styled.div`
    font-size: 30px;
`

type Props = {
    icon: string;
    title: string;
    value: number;
    format: number
}

function CustomerByBook({ icon, title, value, format }: Props) {

    return (
        <Wrapper>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <IconUser icon={icon} />
                <div style={{ marginLeft: '10px' }}>
                    <Title className='font_family_bold'>{title}</Title>
                    <Value className='font_family_bold color_primary'>{format === 1 ? thousandFormat(value || 0) : currencyFormat(value || 0)}</Value>
                </div>
            </div>
        </Wrapper >
    );
}

export default CustomerByBook;
