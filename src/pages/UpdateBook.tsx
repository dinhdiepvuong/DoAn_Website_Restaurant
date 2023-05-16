import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Steps } from 'rsuite';
import styled from 'styled-components';
import BasePagination from '../base/pagination';
import BaseTable from '../base/table';
import Avatar from '../components/Avatar';
import BoxChangeStatus from '../components/book/BoxChangeStatus';
import ModalChooseProductForBook from '../components/modal/ModalChooseProductForBook';
import ModalListObject from '../components/modal/ModalListObject';
import Tag from '../components/Tag';
import useClickOutSide from '../hooks/useClickOutside';
import { ColumnType, OrderType } from '../interfaces';
import { findAllBooks, findFoodsAndTablesByBook, updateBook, updateFoodInBook } from '../redux/slices/bookSlice';
import { AppDispatch } from '../redux/store';
import { primaryColor } from '../theme';
import { BOOK_DETAIL_STATUS, convertMsToHM, genPaymentMethod, genStatusOrder, ICON, Notification, ORDER_STATUS } from '../utils';
import { currencyFormat } from '../utils/format';

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

function UpdateBook() {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chosenBook, setChosenBook] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: 'Danh sách đơn đặt bàn',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [isShow, setIsShow] = useState<boolean>(false);
    const changeStatusRef = useRef<HTMLDivElement>(null);
    const [foods, setFoods] = useState<any[]>([]);
    const [tables, setTables] = useState<any[]>([]);

    const [visibleModalProduct, setVisibleModalProduct] = useState<boolean>(false);
    const [chosenProducts, setChosenProducts] = useState<Array<{
        product: any,
        quantity: number,
        note: string,
        status: number,
    }>>([]);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page,
                    status: [ORDER_STATUS.NOT_USE, ORDER_STATUS.USING],
                    isNotExpired: true
                }

                const result: any = await dispatch(findAllBooks(params)).unwrap();

                const { data, pagination } = result?.data;

                setDataModal((prevState: any) => {
                    return {
                        ...prevState,
                        data: data || [],
                        total: pagination[0]?.total || 0
                    }
                })
            } catch (error) {
                Notification("error", "Lấy danh sách khu vực thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, page]);

    useClickOutSide(changeStatusRef, () => setIsShow(false));

    const textAlign = (value: Type) => value;

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

    const headerBook = [
        {
            name: "ID",
            width: "5%",
            dataKey: 'id',
            render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
            textAlign: textAlign("center"),
        },
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
            width: "10%",
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

    const handleChoose = async (e: any) => {
        try {

            console.log(e);
            const result = await dispatch(findFoodsAndTablesByBook(e?.data?.id)).unwrap();

            const { foods, tables } = result?.data;

            setFoods(foods || []);

            setTables(tables || []);

            setChosenBook(e)
        } catch (error) {
            console.log('find foods by book', error);
        }

    }

    const totalPrice = useMemo(() => {
        let result = 0;
        foods.concat(chosenProducts).forEach(item => {
            result += item?.product?.price * item?.quantity;
        });

        return result;
    }, [chosenProducts, foods])

    const handleCloseModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: false
            }
        })
    }

    const handleOpenModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: true,
            }
        })
    }

    const handleChangeStatus = async (e: any) => {
        try {
            const book = {
                ...chosenBook?.data,
                status: e,
            }

            await dispatch(updateBook(book)).unwrap();

            setChosenBook((prevState: any) => {
                return {
                    ...prevState,
                    data: {
                        ...prevState?.data,
                        status: e
                    }
                }
            });
        } catch (error) {
            Notification('error', "Cập nhật trạng thái thất bại", dispatch);
        }
    }

    const handleCloseModalProduct = () => {
        setVisibleModalProduct(false);
    }

    const handleOpenModalProduct = () => {
        setVisibleModalProduct(true);
    }

    const handleChooseProduct = (product: any, quantity: number, note?: any) => {
        setChosenProducts((prevState: any) => {
            const index = prevState.findIndex((item: any) => item?.product?.id === product.id);
            const newState = [...prevState];

            if (quantity > 0) {
                if (index === -1) {
                    newState.push({
                        product,
                        quantity,
                        note: note || '',
                        status: BOOK_DETAIL_STATUS.NEW
                    })
                } else {
                    newState[index] = {
                        product,
                        quantity,
                        note: note || '',
                        status: BOOK_DETAIL_STATUS.NEW
                    }
                }
            } else {
                newState.splice(index, 1);
            }

            return newState;
        })
    }

    const handleUpdate = async () => {
        try {
            const newProducts = chosenProducts.map((item) => {
                return {
                    productId: item?.product?.id,
                    note: item?.note,
                    quantity: item?.quantity,
                    status: BOOK_DETAIL_STATUS.NEW,
                }
            });

            const body = {
                bookId: chosenBook?.data?.id,
                newProducts,
                totalPrice,
            }

            await dispatch(updateFoodInBook(body)).unwrap();

            Notification("success", "Cập nhật đơn đặt hàng thành công", dispatch);
        } catch (error) {
            Notification("error", "Cập nhật đơn đặt hàng thất bại", dispatch);
        }
    }

    return (
        <Wrapper>
            <div className="font25 d-flex justify-content-center font_family_bold mt-2">Cập nhật thông tin đơn đặt bàn</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="box_shadow_card bg_white border_radius_5 p-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="font16 font_family_bold_italic">
                        Chọn đơn đặt bàn
                    </div>
                    <button onClick={handleOpenModal} type="button" className="btn bg_primary color_white font16 font_family_bold_italic">Danh sách đơn đặt bàn</button>
                </div>
                <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
                    {
                        chosenBook?.data ?
                            <>
                                <Icon icon={ICON.SELECTED} className="icon50x50 color_primary" />
                                <div>Bạn đã chọn đơn đặt bàn</div>
                            </>
                            :
                            <>
                                <Icon icon={ICON.CLOSE} className="icon50x50 color_red" />
                                <div className="mt-2 font14 font_family_bold_italic">Bạn chưa chọn đơn đặt bàn</div>
                            </>
                    }

                </div>
            </div>
            <div className="my-4 divider_vertical_dashed "></div>
            <div className="p-4 bg_white box_shadow_card mt-4">
                {
                    chosenBook?.data ?
                        <>
                            <div className="mt-4">
                                <div className="m-0 p-0 d-flex align-items-center justify-content-between">
                                    <div className="font18 font_family_bold">
                                        ID - {chosenBook?.data?.id}
                                    </div>
                                    <div ref={changeStatusRef} className='position-relative'>
                                        <button
                                            onClick={() => setIsShow(true)}
                                            className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                                        >
                                            Thay đổi trạng thái
                                        </button>
                                        <BoxChangeStatus onClick={(e: any) => {
                                            setIsShow(false);
                                            handleChangeStatus(e);
                                        }} status={chosenBook?.data?.status} isShow={isShow} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Steps
                                    current={chosenBook?.data?.status}
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
                                        {foods.concat(chosenProducts).map((item: any, index: number) => (
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
                                <div className='mt-4 d-flex justify-content-end'>
                                    <button
                                        onClick={handleOpenModalProduct}
                                        className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                                    >
                                        Thêm thực đơn
                                    </button>
                                </div>
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
                                        {tables.map((item: any, index: number) => (
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
                                            <div>{currencyFormat(totalPrice)}</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <div>Tiền đã cọc</div>
                                            <div>{currencyFormat(chosenBook?.data?.deposit)}</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <div className="font_family_bold">Tổng tiền còn lại</div>
                                            <div className="font_family_bold">
                                                {currencyFormat(totalPrice - chosenBook?.data?.deposit)}
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
                                        Thời gian đặt bàn: {moment(chosenBook?.data?.createdAt).format(`DD-MM-YYYY HH:mm`)}
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        Thời gian nhận bàn: {moment(chosenBook?.data?.checkoutAt).format(`DD-MM-YYYY HH:mm`)}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 m-0 pr_10px d-flex flex-column align-items-end">
                                    <div className="font16 font_family_bold">Khách hàng</div>
                                    <div className="divider_vertical_solid d-block my-3"></div>
                                    <div className="font14 font_family_regular">
                                        {chosenBook?.data?.customer?.name}
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        {chosenBook?.data?.customer?.phone}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 d-flex justify-content-end'>
                                <button
                                    onClick={handleUpdate}
                                    disabled={Boolean(chosenProducts.length === 0)}
                                    className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                                >
                                    Cập nhật đơn đặt bàn
                                </button>
                            </div>
                        </>
                        :
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <Icon className='icon100x100 color_888' icon={ICON.BOOK} />
                            <div className='mt-2 font16 font_family_bold_italic color_888'>
                                Bạn chưa chọn đơn đặt bàn
                            </div>
                        </div>
                }


            </div>
            {/* <div className="d-none">
            <Invoice
              deliveryFee={order?.shipping.fee}
              discount={getDiscount()}
              subTotal={getSubTotal()}
              tax={getTax()}
              order={order}
              printRef={printRef}
            />
          </div> */}
            <ModalListObject page={page} handleClose={handleCloseModal} chosenData={chosenBook} data={dataModal} header={headerBook} onChoose={handleChoose} />
            <ModalChooseProductForBook chosenProducts={chosenProducts} visible={visibleModalProduct} handleClose={handleCloseModalProduct} handleChoose={handleChooseProduct} />
        </Wrapper>
    );
}

export default UpdateBook