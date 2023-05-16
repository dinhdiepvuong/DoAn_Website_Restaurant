import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findOneOrder } from '../redux/slices/orderSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';

function OrderDetail() {
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
                const result: any = await dispatch(findOneOrder(id)).unwrap();

                const { book, foods, tables } = result?.data;
                if (book)
                    setData({
                        book,
                        foods,
                        tables
                    })
                else
                    navigate("/orders/list");
            } catch (error) {
                navigate("/orders/list");
                Notification("error", "Lấy thông tin hoá đơn thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/orders/list");
    }

    return (
        <div>OrderDetail</div>
    )
}

export default OrderDetail