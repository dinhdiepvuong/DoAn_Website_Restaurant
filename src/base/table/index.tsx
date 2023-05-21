import React from 'react'
import { useSelector } from 'react-redux';
import { Table } from 'rsuite';
import styled from 'styled-components';
import { ColumnType } from '../../interfaces'
import { sidebarModeSelector } from '../../redux/slices/themeSlice';
import { DEFAULT_WIDTH_TABLE, SIDE_BAR_MODE } from '../../utils';

const { Column, HeaderCell, Cell } = Table;

type BaseTableProps = {
    columns: ColumnType[];
    data: any[];
    onRowClick? : (e: any) => void;
}

const CTable = styled(Table)`
    margin-top: 10px;
    overflow-x: hidden;
    transition: all 0.5s ease;

    .rs-table-row {
        background-color: #fff !important;
        cursor: pointer;
    }

    .rs-table-cell {
        &:hover {
            background-color: #fff !important;
        }
    }

    .rs-table-cell-header {
        font-size: 14px;
        color: #888;
        font-weight: 600;
    }
    .rs-table-scrollbar {
        display: none !important;
    }
`

function BaseTable({ columns, data, onRowClick = (e: any) => 0 }: BaseTableProps) {
    const sidebarMode = useSelector(sidebarModeSelector);

    const getWidthColumn = (column: ColumnType): number => {
        if (sidebarMode === SIDE_BAR_MODE.SMALL) return (DEFAULT_WIDTH_TABLE.LARGE * column.width) / 100;

        return (DEFAULT_WIDTH_TABLE.SMALL * column.width) / 100
    }

    return (
        <CTable onRowClick={onRowClick} hover={false} id='table' data={data} width={sidebarMode === SIDE_BAR_MODE.SMALL ? DEFAULT_WIDTH_TABLE.LARGE : DEFAULT_WIDTH_TABLE.SMALL} >
            {
                columns.map((column, index) => (
                    <Column key={column?.key} width={getWidthColumn(column)} align={column?.align || "center"}>
                        <HeaderCell style={{ width: '200px !important' }}>
                            {column?.name}
                        </HeaderCell>
                        <Cell dataKey={column?.dataKey}>
                            {(rowData, index) => column.render(rowData[column?.dataKey], rowData, index)}
                        </Cell>
                    </Column>
                ))
            }
        </CTable>
    )
}

export default BaseTable