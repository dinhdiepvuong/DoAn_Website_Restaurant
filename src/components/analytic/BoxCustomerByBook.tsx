import React from 'react'
import styled from 'styled-components'
import CustomerByBook from './CustomerByBook'
import { ReportTimeCustomerByBook } from './ReportTimeCustomerByBook'

const Wrapper = styled.div`
    
`

type Props = {
    handleChange: (e: any) => void;
    data: any;
}

function BoxCustomerByBook({ data, handleChange }: Props) {
    return (
        <Wrapper className='w100_per bg_white p-4 box_shadow_card'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='font16 font_family_bold ml_10px'>Khách hàng - Đơn đặt bàn</div>
                <ReportTimeCustomerByBook displayFilter onChangeDate={handleChange} />
            </div>
            <div className='d-flex'>
                <CustomerByBook format={1} icon="ph:users-three" title="Khách hàng" value={data?.customer || 0} />
                <CustomerByBook format={1} icon="fluent:book-database-24-regular" title="Đơn đặt bàn" value={data?.book} />
            </div>
        </Wrapper>
    )
}

export default BoxCustomerByBook