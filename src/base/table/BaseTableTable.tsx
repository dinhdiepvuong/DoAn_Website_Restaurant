import { Icon } from '@iconify/react';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Tag from '../../components/Tag';
import { ENTITY_STATUS, genStatusFood, ICON } from '../../utils';

type Props = {
    data: any[];
    handleUpdateStatus: (table: any, position: number) => void;
};
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
function BaseTableTable({ data, handleUpdateStatus }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "",
            width: "0%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tên bàn",
            width: "25%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số người tối đa",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Trạng thái",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Khu vực",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Hành động",
            width: "15%",
            textAlign: textAlign("right"),
        },
    ];
    return (
        <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
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
                            style={{
                                width: header.at(0)?.width,
                                textAlign: header.at(0)?.textAlign,
                            }}
                        >

                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(1)?.width,
                                textAlign: header.at(1)?.textAlign,
                            }}
                        >
                            {item?.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(2)?.width,
                                textAlign: header.at(2)?.textAlign,
                            }}
                        >
                            {item.quantity}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            <div className={`d-inline py-1 px-2 border_radius_10 font12 font_family_bold_italic ${item.status === ENTITY_STATUS.ACTIVATED ? `bg_primary color_white` : `bg_red color_black`}`}>
                                {genStatusFood(item?.status).name}
                            </div>
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            {item?.area?.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(5)?.width,
                                textAlign: header.at(5)?.textAlign,
                            }}
                        >
                            <Link to={`/tables/detail/${item.id}`} className="btn p-0 mx-2">
                                <Icon className="icon20x20 color_888" icon={ICON.EYE} />
                            </Link>
                            {
                                item.status === ENTITY_STATUS.ACTIVATED
                                    ?
                                    <button onClick={() => handleUpdateStatus({
                                        ...item,
                                        status: ENTITY_STATUS.DEACTIVATED
                                    }, index)} data-toggle="tooltip" data-placement="bottom" title="Dừng hoạt động" className="btn p-0 m-0">
                                        <Icon className="icon20x20 color_orange" icon="bxs:lock" />
                                    </button>
                                    :
                                    <button onClick={() => handleUpdateStatus({
                                        ...item,
                                        status: ENTITY_STATUS.ACTIVATED
                                    }, index)} data-toggle="tooltip" data-placement="bottom" title="Bật hoạt động" className="btn p-0 m-0">
                                        <Icon className="icon20x20 color_primary bxs:lock-open" icon="bxs:lock-open" />
                                    </button>
                            }
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default React.memo(BaseTableTable);