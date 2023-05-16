import { Icon } from '@iconify/react';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Tag from '../../components/Tag';
import { ENTITY_STATUS, genStatusFood, genTypeOfProductType, ICON } from '../../utils';
import { currencyFormat } from '../../utils/format';

type Props = {
    data: any[];
    handleUpdateStatus: (productType: any, index: number) => void;
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
function BaseTableProductType({ data, handleUpdateStatus }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "STT",
            width: "5%",
            textAlign: textAlign("left"),
        },
        {
            name: "Hình ảnh",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tên loại thực phẩm",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số lượng thực phẩm",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Loại",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Trạng thái",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Hành động",
            width: "10%",
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
                            {index + 1}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(1)?.width,
                                textAlign: header.at(1)?.textAlign,
                            }}
                        >
                            <Avatar size={50} url={item?.avatar} shape="rectangle" />
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(2)?.width,
                                textAlign: header.at(2)?.textAlign,
                            }}
                        >
                            {item?.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            {item?.quantityProduct}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(4)?.width,
                                textAlign: header.at(4)?.textAlign,
                            }}
                            className="font14 font_family_bold_italic"
                        >
                            {genTypeOfProductType(item?.type || 0)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(5)?.width,
                                textAlign: header.at(5)?.textAlign,
                            }}
                        >
                            <div className={`d-inline py-1 px-2 border_radius_10 font12 font_family_bold_italic ${item.status === ENTITY_STATUS.ACTIVATED ? `bg_primary color_white` : `bg_red color_black`}`}>
                                {genStatusFood(item?.status).name}
                            </div>
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(6)?.width,
                                textAlign: header.at(6)?.textAlign,
                            }}
                        >
                            <Link to={`/product-types/detail/${item.id}`} className="btn p-0 mx-2">
                                <Icon className="icon20x20 color_888" icon={ICON.EYE} />
                            </Link>
                            {
                                item.status === ENTITY_STATUS.ACTIVATED
                                    ?
                                    <button type='button' onClick={() => handleUpdateStatus({
                                        ...item,
                                        status: ENTITY_STATUS.DEACTIVATED
                                    }, index)} data-toggle="tooltip" data-placement="bottom" title="Dừng hoạt động" className="btn p-0 m-0">
                                        <Icon className="icon20x20 color_orange" icon="bxs:lock" />
                                    </button>
                                    :
                                    <button type='button' onClick={() => handleUpdateStatus({
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

export default React.memo(BaseTableProductType);