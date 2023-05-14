import { setDate } from 'date-fns/esm';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../base/pagination';
import BaseTableBook from '../base/table/BaseTableBook';
import BoxSearchBook from '../components/book/BoxSearchBook'
import { BookType } from '../interfaces';
import { findAllBooks } from '../redux/slices/bookSlice';
import { AppDispatch } from '../redux/store';
import { Notification, ORDER_STATUS } from '../utils';

const countPerRow = 10;
function Book() {
    const dispatch = useDispatch<AppDispatch>();
    const [books, setBooks] = useState<BookType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();
    const [phone, setPhone] = useState<string>('');
    const [status, setStatus] = useState<any>(-1);
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                let params: any = {
                    page,
                    phone,
                    status: status === -1 ? '' : status === ORDER_STATUS.CANCELED ? [ORDER_STATUS.NOT_USE] : [status],
                    ...(status === ORDER_STATUS.NOT_USE ? { isNotExpired: true } : status === ORDER_STATUS.CANCELED ? { isExpired: true } : {})
                }

                if (dateRange[0] && dateRange[1]) {
                    const [startAt, endAt] = dateRange;

                    params = {
                        ...params,
                        dateRange: {
                            startAt: new Date(moment(startAt).format()).getTime(),
                            endAt: new Date(moment(endAt).endOf("d").format()).getTime()
                        }
                    }
                }

                const result: any = await dispatch(findAllBooks(params)).unwrap();

                const { data, pagination } = result?.data;

                setBooks(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                Notification("error", "Lấy danh sách đơn đặt bàn thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dateRange, dispatch, page, phone, status]);


    const handleDetail = (id: string) => {
        navigate(`/books/detail/${id}`)
    }


    const handleFilter = (e: any) => {
        setPhone(e || '');
    }

    const handleFilterByType = (e: any) => {
        setStatus(e);
    }

    const handleChangeTime = (e: any) => {
        setDateRange(e);
    }

    return (
        <>
            <BoxSearchBook dateRange={dateRange} handleChangeTime={handleChangeTime} handleFilterByType={handleFilterByType} handleFilter={handleFilter} />
            <BaseTableBook handleDetail={handleDetail} data={books} />
            <div className='mt-4'>
                <BasePagination page={page} total={total} onChange={(e: any) => setPage(page)} />
            </div>
        </>
    )
}

export default Book