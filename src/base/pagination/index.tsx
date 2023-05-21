import React, { useState } from 'react'
import { Pagination } from 'rsuite';
import styled from 'styled-components';
import { primaryColor, primaryHoverColor } from '../../theme';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 10px;

    .rs-pagination-btn {
        color: ${primaryColor};
        font-weight: 550;
    }

    .rs-pagination-btn.rs-pagination-btn-active {
        border: 1px solid ${primaryColor};
        background-color: ${primaryColor};
        color: #fff;
        font-weight: 600;
    }
`

type BasePaginationProps = {
    onChange?: (e: any) => void;
    total?: number;
    page?: number;
}

function BasePagination({ onChange = (e: any) => null, total = 0, page = 0 }: BasePaginationProps) {
    const handleChangeActivePage = (e: any) => {
        onChange(e);
    }


    return (
        <Wrapper>
            <Pagination prev next last first total={total} limit={10} maxButtons={5} size="sm" activePage={page} onChangePage={handleChangeActivePage} />
        </Wrapper>
    )
}

export default BasePagination