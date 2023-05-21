import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../components/Avatar'
import { convertMsToHM, defaultAvatar, genAddress, genStatusOrder, genTypeOfProductType, ICON, Notification, ORDER_STATUS, PAYMENT_METHOD, PRODUCT_TYPE, textAlign } from '../utils';
import { currencyFormat } from '../utils/format';
import DatePicker, { registerLocale } from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import ModalListObject from '../components/modal/ModalListObject';
import vi from "date-fns/locale/vi";
import { OrderType } from '../interfaces';
import BoxRadio from '../components/BoxRadio';
import { createBook, findAllBooks, findAllBooksForOrder, findFoodsAndTablesByBook } from '../redux/slices/bookSlice';
import themeSlice from '../redux/slices/themeSlice';
import moment from 'moment';
import Tag from '../components/Tag';
import { createOrder } from '../redux/slices/orderSlice';

registerLocale("vi", vi);

type Type =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
const TableCell = styled.td`
  padding: 5px;
`;
const TableCellHead = styled.th`
  padding: 5px;
`;

const headerBook = [
    {
        name: "Khách hàng",
        width: "25%",
        dataKey: 'customer',
        render: (data: any) => <div
            className='d-flex align-items-center'
        >
            <Avatar size={42} url={data?.avatar} shape="circle" />
            <div className='ml_10px'>
                <div className='font14 font_family_bold_italic'>{data?.name}</div>
                <div className='font12 font_family_bold_italic mt-2 color_888'>SĐT: {data?.phone}</div>
            </div>
        </div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Tổng tiền",
        width: "15%",
        dataKey: 'totalPrice',
        render: (data: any) => <div>{currencyFormat(data || 0)}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Thời gian đặt bàn",
        width: "15%",
        dataKey: 'createdAt',
        render: (data: any) => <div>{moment(data).format(`DD/MM/YYYY HH:mm`)}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Thời gian nhận bàn",
        width: "15%",
        dataKey: 'checkoutAt',
        render: (data: any) => <div>{moment(data).format(`DD/MM/YYYY HH:mm`)}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Số người",
        width: "10%",
        dataKey: 'quantityCustomer',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Trạng thái",
        width: "15%",
        dataKey: 'status',
        render: (data: any) => <Tag color={genStatusOrder(data || 0).color} name={genStatusOrder(data || 0).name} />,
        textAlign: textAlign("left"),
    },
    {
        name: "",
        width: "5%",
        dataKey: 'id',
        render: (data: any, chosen?: any) => <>
            {
                chosen ? <Icon icon={ICON.SELECTED} className="icon20x20 color_primary" />
                    : <Icon icon={ICON.UNSELECT} className="icon20x20 color_primary" />
            }
        </>,
        textAlign: textAlign("right"),
    },
];

export const dataPaymentMethod = [
    {
        name: "Tiền mặt",
        value: PAYMENT_METHOD.CASH,
    },
    {
        name: "Internet Banking",
        value: PAYMENT_METHOD.INTERNET_BANKING,
    },
];


function CreateBook() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [checkoutAt, setCheckoutAt] = useState<Date>(new Date());
    const [timeToUse, setTimeToUse] = useState<any>();
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: '',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [dataBook, setDataBook] = useState<any>({
        data: [],
        total: 0,
    });
    const [chosenBook, setChosenBook] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [foods, setFoods] = useState<any[]>([]);
    const [tables, setTables] = useState<any[]>([]);

    const [paymentMethod, setPaymentMethod] = useState<number>(PAYMENT_METHOD.CASH);
    const [search, setSearch] = useState<string>('');


    const textAlign = (value: Type) => value;

    const headerProduct = [
        {
            name: "Món ăn",
            width: "50%",
            textAlign: textAlign("left"),
        },
        {
            name: "Đơn giá",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số lượng",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Thành tiền",
            width: "20%",
            textAlign: textAlign("left"),
        },
    ]

    const headerTable = [
        {
            name: "Bàn",
            width: "70%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số lượng người",
            width: "30%",
            textAlign: textAlign("center"),
        },
    ]

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    status: ORDER_STATUS.USING,
                }

                const result: any = await dispatch(findAllBooksForOrder(params)).unwrap();

                const { data, pagination } = result?.data;

                setDataBook((prevState: any) => {
                    return {
                        data: data || [],
                        total: pagination[0]?.total | 0
                    }
                })
            } catch (error: any) {
                console.log('error', error);
            }
        }

        initData();
    }, [dispatch, page]);

    const handleChooseBook = async (e: any) => {
        try {

            console.log(e);
            const result = await dispatch(findFoodsAndTablesByBook(e?.data?.id)).unwrap();

            const { foods, tables } = result?.data;

            setFoods(foods || []);

            setTables(tables || []);

            setChosenBook(e);
        } catch (error) {
            console.log('find foods by book', error);
        }

    }

    const handleCloseModalBook = () => {
        setDataModal((prevState: any) => {
            return {
                visible: false,
                data: [],
                title: '',
                total: 0,
            }
        })
    }

    const handleOpenModalBook = () => {
        setDataModal((prevState: any) => {
            return {
                visible: true,
                data: dataBook?.data || [],
                title: 'Danh sách đơn đặt bàn',
                total: dataBook?.total || 0,
            }
        })
    }

    const handleFilter = async (e: any) => {
        try {
            const params = {
                status: ORDER_STATUS.USING,
                table: e
            }

            const result: any = await dispatch(findAllBooksForOrder(params)).unwrap();

            const { data, pagination } = result?.data;

            setDataBook((prevState: any) => {
                return {
                    data: data || [],
                    total: pagination[0]?.total | 0
                }
            });

            setDataModal((prevState: any) => {
                return {
                    ...prevState,
                    data: data || [],
                    total: pagination[0]?.total | 0,
                }
            })
        } catch (error: any) {
            console.log('error', error);
        }
    }

    const handleCreateOrder = () => {
        dispatch(
            themeSlice.actions.showBackdrop({
                isShow: true,
                content: "",
            })
        );

        const order: OrderType | any = {
            bookId: chosenBook?.data?.id,
            orderDate: new Date(),
            paymentMethod,
        };

        saveBook(order);
    }

    const saveBook = async (order: any) => {
        try {
            console.log('handleCreateOrder', order);
            await dispatch(createOrder(order)).unwrap();

            navigate("/orders/list");
            Notification("success", "Thanh toán thành công", dispatch);
        } catch (error) {
            Notification("error", "Thanh toán thất bại", dispatch);
        } finally {
            dispatch(
                themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: "",
                })
            );
        }
    }

    return (
        <>
            <div className="font25 d-flex justify-content-center font_family_bold mt-2">Thanh toán đơn đặt bàn</div>
            <div className='row p-0 m-0 mt-4'>
                <div className='col-12 col-lg-12 p-2'>
                    <div className='box_shadow_card bg_white border_radius_5 p-2 d-flex flex-column align-items-center justify-content-center'>
                        <Avatar size={100} shape="rectangle" url={chosenBook?.data?.customer?.avatar || defaultAvatar} />
                        <div className='mt-2 font_family_bold font16'>{chosenBook?.data?.customer?.name || `Bạn chưa chọn đơn đặt bàn`}</div>
                        <button onClick={handleOpenModalBook} type='button' className='btn mt-2 font_family_bold_italic color_white bg_primary px-3 py-2 font12 border_radius_5'>Chọn đơn đặt bàn</button>
                        <div className='w100_per p-4'>
                            <div className='d-flex align-items-center'>
                                <div className='w50_px'>
                                    <Icon icon="fa:phone-square" className="icon30x30 color_primary" />
                                </div>
                                <span className='font_family_bold font14'>{chosenBook?.data?.customer?.phone || `Số điện thoại`}</span>
                            </div>
                            <div className='d-flex align-items-center mt-4'>
                                <div className='w50_px' style={{ minWidth: '50px' }}>
                                    <Icon icon="ri:map-pin-2-fill" className="icon30x30 color_primary" />
                                </div>
                                <span className='font_family_bold font14'>{chosenBook?.data?.customer?.address ? genAddress(chosenBook?.data?.customer?.address) : `Địa chỉ`}</span>
                            </div>
                        </div>
                        <div className='divider_vertical_solid' />
                        <div className='mt-2 w100_per'>
                            <div className='font_family_bold_italic font15 w100_per'>Thời gian nhận bàn</div>

                            <input
                                disabled
                                className="mt-2 h40_px w100_per"
                                type="text"
                                value={moment(chosenBook?.data?.checkoutAt).format(`DD/MM/YYYY HH:mm`)}
                                placeholder='Thời gian nhận bàn'
                            />
                            <div className='font_family_bold_italic font15 w100_per mt-4'>Thời gian sử dụng</div>
                            <input
                                disabled
                                className="mt-2 h40_px w100_per"
                                type="text"
                                placeholder='Nhập thời gian sử dụng'
                                value={convertMsToHM(chosenBook?.data?.timeToUse || 0)}
                            />
                            <div className='font_family_bold_italic font15 w100_per mt-4'>Số người sử dụng</div>
                            <input
                                disabled
                                className="mt-2 h40_px w100_per"
                                type="number"
                                placeholder='Số người sử dụng'
                                value={chosenBook?.data?.quantityCustomer}
                            />
                            <div className='font_family_bold_italic font15 w100_per mt-4'>Ghi chú</div>
                            <textarea
                                disabled
                                placeholder="Nhập ghi chú"
                                className="w100_per mt-2"
                                rows={5}
                                value={chosenBook?.data?.customerNote}
                            ></textarea>
                            {/* <div className='divider_vertical_dashed my-2'></div>
                            <div className="mt-2">
                                <div className='mb-2 font15 font_family_bold_italic'>Phương thức thanh toán</div>
                                <BoxRadio value={paymentMethod} data={dataPaymentMethod} onChange={(e: any) => setPaymentMethod(e)} />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-12 p-2'>
                    <div className='bg_white box_shadow_card border_radius_10'>
                        <table className='w100_per'>
                            <thead>
                                <tr className='border_bottom_gray_1px'>
                                    {headerProduct.map((item, index) => (
                                        <TableCellHead
                                            key={index}
                                            className="font_family_regular font16 p-3"
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
                            {
                                foods.length > 0 &&
                                <tbody className='w100_per'>
                                    {
                                        foods.map((item: any, index) =>
                                            <tr className='border_top_gray_1px' key={`${item.id}`}>
                                                <TableCell className='p-3 d-flex align-items-center' style={{
                                                    width: headerProduct.at(0)?.width,
                                                    textAlign: headerProduct.at(0)?.textAlign,
                                                }}>
                                                    <Avatar url={item?.product?.avatar} size={64} shape="rectangle" />
                                                    <div className='ml_10px w100_per'>
                                                        <div className='font14 font_family_bold'>{item?.product?.name}</div>
                                                        <div className='mt-1 font12 font_family_italic color_888'>Loại: {item?.product?.productType?.name}</div>
                                                        <div className='mt-2 font12 font_family_bold_italic color_888'>{genTypeOfProductType(item?.product?.productType?.type)}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className='font14 font_family_bold_italic' style={{
                                                    width: headerProduct.at(1)?.width,
                                                    textAlign: headerProduct.at(1)?.textAlign,
                                                }}>{currencyFormat(item?.product?.price)}</TableCell>
                                                <TableCell style={{
                                                    width: headerProduct.at(2)?.width,
                                                    textAlign: headerProduct.at(2)?.textAlign,
                                                }}>
                                                    {item?.quantity}
                                                </TableCell>
                                                <TableCell className='font14 font_family_bold_italic' style={{
                                                    width: headerProduct.at(3)?.width,
                                                    textAlign: headerProduct.at(3)?.textAlign,
                                                }}>{currencyFormat(item?.product?.price * item?.quantity)}</TableCell>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            }
                        </table>
                        {
                            foods.length === 0 &&
                            <div className='w100_per p-4 d-flex align-items-center justify-content-center flex-column'>
                                <Icon icon={ICON.PRODUCT} className='icon100x100' />
                                <div className='mt-4 font16 font_family_bold_italic'>Bạn chưa chọn đơn đặt bàn</div>
                            </div>
                        }
                    </div>
                    <div className='bg_white box_shadow_card border_radius_10 mt-4'>
                        <table className='w100_per'>
                            <thead>
                                <tr className='border_bottom_gray_1px'>
                                    {headerTable.map((item, index) => (
                                        <TableCellHead
                                            key={index}
                                            className="font_family_regular font16 p-3"
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
                            {
                                tables.length > 0 &&
                                <tbody className='w100_per'>
                                    {
                                        tables.map((item, index) =>
                                            <tr className='border_top_gray_1px' key={`${new Date().getTime() + index}`}>
                                                <TableCell className='p-3 d-flex align-items-center' style={{
                                                    width: headerTable.at(0)?.width,
                                                    textAlign: headerTable.at(0)?.textAlign,
                                                }}>
                                                    <Avatar url={item?.table?.area?.avatar} size={64} shape="rectangle" />
                                                    <div className='ml_10px'>
                                                        <div className='font14 font_family_bold'>{item?.table?.name}</div>
                                                        <div className='mt-1 font12 font_family_italic color_888'>Số người tối đa: {item?.table?.quantity}</div>
                                                        <div className='mt-2 font12 font_family_bold_italic color_888'>Khu vực: {item?.table?.area?.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{
                                                    width: headerTable.at(1)?.width,
                                                    textAlign: headerTable.at(1)?.textAlign,
                                                }}>
                                                    <div className='font14 font_family_bold_italic'>
                                                        {item?.quantity}
                                                    </div>
                                                </TableCell>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            }
                        </table>
                        {
                            tables.length === 0 &&
                            <div className='w100_per p-4 d-flex align-items-center justify-content-center flex-column'>
                                <Icon icon={ICON.TABLE} className='icon100x100' />
                                <div className='mt-4 font16 font_family_bold_italic'>Bạn chưa chọn đơn đặt bàn</div>
                            </div>
                        }
                    </div>
                    <div className='divider_vertical_dashed my-2'></div>
                    <div className='mt-2 d-flex align-items-center justify-content-between'>
                        <div className='font15 font_family_bold_italic'>Tổng tiền: </div>
                        <div className='font14 font_family_bold_italic'>{currencyFormat(chosenBook?.data?.totalPrice || 0)}</div>
                    </div>
                    <div className='mt-2 d-flex align-items-center justify-content-between'>
                        <div className='font15 font_family_bold_italic'>Tiền cọc (40%):</div>
                        <div className='font14 font_family_bold_italic'>{currencyFormat(chosenBook?.data?.deposit || 0)}</div>
                    </div>
                    <div className='mt-2 d-flex align-items-center justify-content-between'>
                        <div className='font15 font_family_bold_italic'>Tổng tiền còn lại:</div>
                        <div className='font14 font_family_bold_italic'>{currencyFormat((chosenBook?.data?.totalPrice || 0) - (chosenBook?.data?.deposit || 0))}</div>
                    </div>
                    <button
                        onClick={handleCreateOrder}
                        disabled={Boolean(!chosenBook?.data?.id)}
                        type='submit'
                        className='btn bg_primary font18 font_family_bold_italic color_white w100_per mt-4'>Thanh toán</button>
                </div>
            </div>

            <ModalListObject handleFilter={handleFilter} isHiddenPagination page={page} handleClose={handleCloseModalBook} chosenData={chosenBook} data={dataModal} header={headerBook} onChoose={handleChooseBook} />
        </>
    )
}

export default CreateBook