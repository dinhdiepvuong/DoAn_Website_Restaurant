import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Steps } from 'rsuite';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import { findOneBook } from '../redux/slices/bookSlice';
import { AppDispatch } from '../redux/store';
import { primaryColor } from '../theme';
import { convertMsToHM, genPaymentMethod, genStatusOrder, ICON, Notification, textAlign } from '../utils';
import { currencyFormat } from '../utils/format';

const TableCell = styled.td`
  padding: 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;

const Wrapper = styled.div`
    .rs-steps-item-status-process .rs-steps-item-icon-wrapper {
        background-color: ${primaryColor} !important;
        border-color: ${primaryColor} !important;
    }
    .rs-steps-item-status-finish .rs-steps-item-icon-wrapper {
        border-color: ${primaryColor} !important;
        color: ${primaryColor} !important;
    }
    .rs-steps-item-status-finish .rs-steps-item-tail, .rs-steps-item-status-finish .rs-steps-item-title:after {
        border-color: ${primaryColor} !important;
    }
`

function BookDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [data, setData] = useState<{
        book: any,
        foods: any[],
        tables: any[]
    }>({
        book: undefined,
        foods: [],
        tables: []
    });
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const result: any = await dispatch(findOneBook(id)).unwrap();

                const { book, foods, tables } = result?.data;
                if (book)
                    setData({
                        book,
                        foods,
                        tables
                    })
                else
                    navigate("/books/list");
            } catch (error) {
                navigate("/books/list");
                Notification("error", "Lấy thông tin đơn đặt bàn thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/books/list");
    }

    const headerTable = [
        {
            name: "Bàn",
            width: "80%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số người",
            width: "20%",
            textAlign: textAlign("right"),
        },
    ];

    const headerProduct = [
        {
            name: "Thực đơn",
            width: "60%",
            textAlign: textAlign("left"),
        },
        {
            name: "Trạng thái",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Tổng tiền",
            width: "20%",
            textAlign: textAlign("right"),
        },
    ];


    return (
        <Wrapper>
            <div className="font20 font_family_bold mt-2">Chi tiết đơn đặt bàn</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="p-4 bg_white box_shadow_card mt-4">
                <>
                    <div className="mt-4">
                        <div className="m-0 p-0 d-flex align-items-center justify-content-between">
                            <div className="font18 font_family_bold">
                                ID - {data?.book?.id}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Steps
                            current={data?.book?.status}
                            className="d-flex w100_per justify-content-between flex-row step_order_status m-4"
                        >
                            {[0, 1, 2, 3].map((item: any, index: number) => (
                                <Steps.Item
                                    style={{ minWidth: "200px" }}
                                    className="font_family_bold"
                                    description={genStatusOrder(item).name}
                                />
                            ))}
                        </Steps>
                    </div>
                    <div className="mt-4">
                        <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
                            <thead className="bg_ddd">
                                <tr>
                                    {headerProduct.map((item, index) => (
                                        <TableCellHead
                                            key={index}
                                            className="font_family_regular font16"
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
                                {data?.foods.map((item: any, index: number) => (
                                    <tr className="border_top_gray_1px" key={index}>
                                        <TableCell
                                            style={{
                                                width: headerProduct.at(0)?.width,
                                                textAlign: headerProduct.at(0)?.textAlign,
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <Avatar
                                                    shape="rectangle"
                                                    size={50}
                                                    url={item?.product?.avatar}
                                                />
                                                <div className='ml_10px'>
                                                    <div className="font14 font_family_bold">
                                                        {item?.product?.name} x {item?.quantity || 0}
                                                    </div>
                                                    <div className='mt-2 font12'>
                                                        {currencyFormat(item?.product?.price || 0)}
                                                    </div>
                                                </div>

                                            </div>
                                        </TableCell>
                                        <TableCell style={{
                                            width: headerProduct.at(1)?.width,
                                            textAlign: headerProduct.at(1)?.textAlign,
                                        }}>
                                            {
                                                item?.status ? `Thêm sau` : `Thêm trước`
                                            }
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                width: headerProduct.at(2)?.width,
                                                textAlign: headerProduct.at(2)?.textAlign,
                                            }}
                                        >
                                            {currencyFormat(item?.product?.price * item?.quantity)}
                                        </TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
                            <thead className="bg_ddd">
                                <tr>
                                    {headerTable.map((item, index) => (
                                        <TableCellHead
                                            key={index}
                                            className="font_family_regular font16"
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
                                {data?.tables.map((item: any, index: number) => (
                                    <tr className="border_top_gray_1px" key={index}>
                                        <TableCell
                                            style={{
                                                width: headerTable.at(0)?.width,
                                                textAlign: headerTable.at(0)?.textAlign,
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <Avatar
                                                    shape="rectangle"
                                                    size={50}
                                                    url={item?.table?.area?.avatar}
                                                />
                                                <div className='ml_10px'>
                                                    <div className="font14 font_family_bold">
                                                        {item?.table?.name}
                                                    </div>
                                                    <div className='mt-2 font12'>
                                                        Khu vực: {item?.table?.area?.name}
                                                    </div>
                                                </div>

                                            </div>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                width: headerTable.at(1)?.width,
                                                textAlign: headerTable.at(1)?.textAlign,
                                            }}
                                        >
                                            {item?.quantity}
                                        </TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <div className="row m-0 p-0">
                            <div className="col-12 col-lg-6 border_top_gray_1px font16 font_family_regular color_888">
                                <div className="d-flex align-items-center justify-content-between mt-4">
                                    <div>Tiền thực đơn</div>
                                    <div>{currencyFormat(data?.book?.totalPrice || 0)}</div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div>Tiền đã cọc</div>
                                    <div>{currencyFormat(data?.book?.deposit || 0)}</div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div className="font_family_bold">Tổng tiền còn lại</div>
                                    <div className="font_family_bold">
                                        {currencyFormat((data?.book?.totalPrice || 0) - (data?.book?.deposit || 0))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 row p-0 m-0">
                        <div className="col-12 col-lg-6 m-0">
                            <div className="font16 font_family_bold">Thời gian</div>
                            <div className="divider_vertical_solid d-block my-3"></div>
                            <div className="font14 font_family_regular">
                                Thời gian đặt bàn: {moment(data?.book?.createdAt).format(`DD-MM-YYYY HH:mm`)}
                            </div>
                            <div className="font14 font_family_regular mt-2">
                                Thời gian nhận bàn: {moment(data?.book?.checkoutAt).format(`DD-MM-YYYY HH:mm`)}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 m-0 pr_10px d-flex flex-column align-items-end">
                            <div className="font16 font_family_bold">Khách hàng</div>
                            <div className="divider_vertical_solid d-block my-3"></div>
                            <div className="font14 font_family_regular">
                                {data?.book?.customer?.name}
                            </div>
                            <div className="font14 font_family_regular mt-2">
                                {data?.book?.customer?.phone}
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 d-flex justify-content-end'>
                        <button
                            onClick={handleBack}
                            className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                        >
                            Quay lại
                        </button>
                    </div>
                </>
            </div>
        </Wrapper>
    )
}

export default BookDetail