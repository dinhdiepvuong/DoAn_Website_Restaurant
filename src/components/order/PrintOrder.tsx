import moment from 'moment';
import React from 'react'
import { Divider } from 'rsuite';
import styled from 'styled-components';
import { currencyFormat } from '../../utils/format';

const Wrapper = styled.div`
    width: 100%;
    padding: 20px
`;

const BoxTitle = styled.div`
    width: 100%;
    display: flex;
    justifyContent: space-between;
    alignItems: center
`;

const ImageRestaurant = styled.img`
    width: 100px;
    height: 100px
`

const TitleInfo = styled.div`
    width: 100%;
    color: gray;
    fontSize: 16px;
`
const Info = styled.div`
    fontSize: 14px;
    textAlign: left;
    width: 100%
`

function TableFood({ foods }: { foods: any[] }) {
    const headerFood = [
        { name: 'STT', minWidth: '5%' },
        { name: 'Tên món ăn', minWidth: '20%' },
        { name: 'Giá', minWidth: '20%' },
        { name: 'Số lượng', minWidth: '20%' },
        { name: 'Ghi chú', minWidth: '15%' },
        { name: 'Thành tiền', minWidth: '20%' }
    ];

    return (
        <div className='mt-2 w100_per'>
            <table className='w100_per' style={{ border: `0px`, marginLeft: '5px' }}>
                <thead>
                    <tr>
                        {headerFood.map((item, index) => (
                            <td
                                className='font_family_bold'
                                key={index}
                                style={{
                                    width: item.minWidth,
                                }}
                            >
                                {item.name}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {foods.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.product?.name}</td>
                            <td>{currencyFormat(item?.product?.price)}</td>
                            <td>{item?.quantity}</td>
                            <td>{
                                item?.status ? `Thêm sau` : `Thêm trước`
                            }</td>
                            <td>{currencyFormat(item?.product?.price * item?.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TableTable({ tables }: { tables: any[] }) {
    const headers = [
        {
            name: 'STT',
            width: '10%'
        },
        {
            name: 'Tên bàn',
            width: '30%'
        },
        {
            name: 'Số người',
            width: '30%'
        },
        {
            name: 'Khu vực',
            width: '300%'
        }
    ];
    return (
        <div className='mt-2 w100_per'>
            <table className='w100_per' style={{ border: `0px`, marginLeft: '5px' }}>
                <thead>
                    <tr>
                        {headers.map((item, index) => (
                            <td className='font_family_bold'
                                key={index} style={{ width: item.width }}>
                                {item.name}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tables.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.table?.name}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.table?.area?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

type Props = {
    printRef?: any,
    data?: any
}

function PrintOrder({ printRef, data }: Props) {
    return (
        <Wrapper ref={printRef}>
            <BoxTitle>
                <div style={{ width: '30%', display: 'flex', justifyContent: 'center' }}>
                    <ImageRestaurant src="https://firebasestorage.googleapis.com/v0/b/restaurant-1a957.appspot.com/o/pngtree-restaurant-logo-design-vector-template-image_388753-removebg-preview.png?alt=media&token=cd438219-fc5d-481d-b2d4-0123e4760a9e" />
                </div>
                <div className='d-flex align-items-center justify-content-center flex-column'
                    style={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div className='font25 color_primary font_family_bold'>Nhà hàng Vương Lập</div>
                    <div className='font16 text-center font_family_bold'>
                        Địa chỉ: 12 Nguyễn Văn Bảo, phường 4, quận Gò Vấp, Tp.HCM
                    </div>
                    <div className='font16 text-center font_family_bold'>
                        Số điện thoại: 0939986833
                    </div>
                </div>
            </BoxTitle>
            <Divider style={{ margin: '20px 10px' }} />
            <div className='w100_per d-flex align-items-center justify-content-center flex-column'>
                <div className='color_red font20 font_family_bold'>
                    Hoá đơn thanh toán
                </div>
                <TitleInfo className='font_family_bold mt-2'>
                    Ngày lập hoá đơn: {moment(data?.order?.createdAt).format(`HH:mm DD/MM/YYYY`)}
                </TitleInfo>
                <TitleInfo className='font_family_bold mt-2'>Thông tin khách hàng</TitleInfo>
                <div className='d-flex align-items-center justify-content-between w100_per mt-3'>
                    <Info className='font_family_bold'>Tên khách hàng: {data?.order?.book?.customer?.name}</Info>
                    <Info className='font_family_bold'>Số điện thoại: {data?.order?.book?.customer?.phone}</Info>
                    <Info className='font_family_bold'>Thời gian đặt bàn: {moment(data?.order?.book?.createAt).format(`HH:mm DD/MM/YYYY`)}</Info>
                </div>
                <div className='d-flex align-items-center justify-content-between w100_per mt-3'>
                    <Info className='font_family_bold'>
                        Thời gian nhận bàn: {moment(data?.order?.book?.checkoutAt).format(`HH:mm DD/MM/YYYY`)}
                    </Info>
                    <Info className='font_family_bold'>
                        Thời gian sử dụng: {moment(data?.order?.book?.timeToUse).format(`HH:mm`)}
                    </Info>
                    <Info className='font_family_bold'>Số lượng khách: {data?.order?.book?.quantityCustomer}</Info>
                </div>
                <div className='divider_vertical_dashed mt-3 my-2'></div>
                <TitleInfo className='font_family_bold mt-2'>Danh sách món ăn</TitleInfo>
                <TableFood foods={data?.foods} />
                <TitleInfo className='font_family_bold mt-4'>Danh sách bàn</TitleInfo>
                <TableTable tables={data?.tables} />
                <div className='divider_vertical_dashed mt-3 my-2'></div>
                <div className="w100_per mt-4">
                    <div className="w100_per d-flex justify-content-end mt-2">
                        <div className='d-flex align-items-center' style={{ width: '300px' }}>
                            <div className='font16 font_family_bold color_888 w100_px'>Tiền đã cọc:</div>
                            <div className='font16 font_family_bold color_888 w200_px'>{currencyFormat(data?.order?.book?.deposit || 0)}</div>
                        </div>
                    </div>
                    <div className="w100_per d-flex justify-content-end mt-2">
                        <div className='d-flex align-items-center' style={{ width: '300px' }}>
                            <div className='font16 font_family_bold color_888 w100_px'>Tổng tiền:</div>
                            <div className='font16 font_family_bold color_888 w200_px'>{currencyFormat(data?.order?.book?.totalPrice || 0)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default PrintOrder