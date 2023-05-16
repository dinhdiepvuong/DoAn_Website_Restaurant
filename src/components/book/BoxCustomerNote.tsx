import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 200px;
`

type BoxCustomerNoteProps = {
    note: string;
    handleChoose: (e: any) => void;
}

function BoxCustomerNote({ note, handleChoose }: BoxCustomerNoteProps) {
    const [value, setValue] = useState<string>(note);

    return (
        <Wrapper>
            <div className='font14 font_family_bold_italic'>
                Ghi chú
            </div>
            <input onChange={e => setValue(e?.target?.value || '')} type="text" className='mt-2 h40_px w100_per' placeholder='Nhập ghi chú' value={value} />
            <div>
                <button onClick={() => handleChoose(value)} className='w100_per mt-4 btn bg_primary color_white font_family_bold font14'>Thêm ghi chú</button>
            </div>
        </Wrapper>
    )
}

export default BoxCustomerNote