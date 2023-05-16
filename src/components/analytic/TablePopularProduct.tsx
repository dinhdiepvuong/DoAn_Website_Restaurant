import React from 'react'
import styled from 'styled-components';
import { currencyFormat } from '../../utils/format';

type Props = {
    data: any[]
}
type Type =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
const TableCell = styled.td`
  padding: 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;
function TablePopularProduct({ data }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "ID",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Name",
            width: "30%",
            textAlign: textAlign("left"),
        },
        {
            name: "Group",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Price/Unit",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Sale Price",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Quantity",
            width: "15%",
            textAlign: textAlign("center"),
        },
    ];
    return (
        <div className='w100_per bg_white border_radius_5 box_shadow_card'>
            <div className='text-center py-2 font16 font_family_bold_italic'>
                Popular Products
            </div>
            <table className="w100_per bg_white">
                <thead className="bg_ddd">
                    <tr>
                        {header.map((item, index) => (
                            <TableCellHead
                                key={index}
                                className="font_family_regular font14"
                                style={{
                                    width: item.width,
                                    textAlign: item.textAlign,
                                }}
                            >
                                {item.name}
                            </TableCellHead>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className="border_top_gray_1px" key={index}>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(0)?.width,
                                    textAlign: header.at(0)?.textAlign,
                                }}
                            >
                                {index + 1}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(1)?.width,
                                    textAlign: header.at(1)?.textAlign,
                                }}
                            >
                                {item.product.name_en}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(2)?.width,
                                    textAlign: header.at(2)?.textAlign,
                                }}
                            >
                                {item.product.group.name_en}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(3)?.width,
                                    textAlign: header.at(3)?.textAlign,
                                }}
                            >
                                {currencyFormat(item.product.type === 'simple' ? item.product.simple.price : item.product.variable.price)}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(4)?.width,
                                    textAlign: header.at(4)?.textAlign,
                                }}
                            >
                                {currencyFormat(item.product.type === 'simple' ? item.product.simple.salePrice : item.product.variable.salePrice)}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(5)?.width,
                                    textAlign: header.at(5)?.textAlign,
                                }}
                            >
                                {item.product.type === 'simple' ? item.product.simple.quantity : item.product.variable.quantity}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePopularProduct