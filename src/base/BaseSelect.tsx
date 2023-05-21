import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.select<{ width: number; height: number }>`
    width: ${p => p.width}px;
    height: ${p => p.height}px;
`

type BaseSelectProps = {
    data: any[];
    onChange: (e: any) => void;
    width?: number;
    height?: number;
}

function BaseSelect({ data, onChange, width = 200, height = 40 }: BaseSelectProps) {
    return (
        <Wrapper id='select' onChange={(e) => onChange(e?.target?.value)} width={width} height={height}>
            {
                data.map((item: any, index: number) => <option value={item?.value}>{item?.name}</option>)
            }
        </Wrapper>
    )
}

export default BaseSelect