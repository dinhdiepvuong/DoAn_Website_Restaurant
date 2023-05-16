import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasePagination from "../base/pagination";
import BaseTableOrder from "../base/table/BaseTableOrder";
import BoxSearchOrder from "../components/order/BoxSearchOrder";
import ModalInfoOrder from "../components/order/ModalInfoOrder";
import Pagination from "../components/Pagination";
import { OrderType } from "../interfaces";
import { findAllOrders } from "../redux/slices/orderSlice";
import { AppDispatch } from "../redux/store";
import { Notification } from "../utils";

function Orders() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [phone, setPhone] = useState<string>('');
  const [dataToPrint, setDataToPrint] = useState<any>({
    visible: false,
    orderId: '',
    handleClose: () => null,
  })

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page,
          phone
        }

        const result: any = await dispatch(findAllOrders(params)).unwrap();

        const { data, pagination } = result?.data;

        setOrders(data || []);

        setTotal(pagination[0]?.total || 0);
      } catch (error) {
        Notification("error", "Lấy danh sách hoá đơn thất bại", dispatch);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [dispatch, page, phone]);

  const handleDetail = (order: any) => {
    navigate(`/orders/${order.id}`)
  }

  const handleFilter = (e: any) => {
    setPhone(e || '')
  }

  const handleClose = () => {
    setDataToPrint({
      visible: false,
      orderId: '',
      handleClose: () => null,
    })
  }

  const handleOpen = (orderId: string) => {
    setDataToPrint({
      visible: true,
      orderId,
      handleClose: () => handleClose(),
    })
  }

  return (
    <>
      <BoxSearchOrder handleFilter={handleFilter} />
      <BaseTableOrder handleOpen={handleOpen} data={orders} handleDetail={handleDetail} />
      <div className='mt-4'>
        <BasePagination page={page} total={total} onChange={(e: any) => setPage(e)} />
      </div>
      <ModalInfoOrder {...dataToPrint} />
    </>
  )
}

export default React.memo(Orders);
