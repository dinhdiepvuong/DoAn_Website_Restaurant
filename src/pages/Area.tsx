import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableArea from '../base/table/BaseTableArea';
import BoxSearch from '../components/area/BoxSearch'
import { AreaType } from '../interfaces';
import { findAllAreas, updateArea } from '../redux/slices/areaSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Area() {
    const dispatch = useDispatch<AppDispatch>();
    const [areas, setAreas] = useState<AreaType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page,
                    name
                }

                const result: any = await dispatch(findAllAreas(params)).unwrap();

                const { data, pagination } = result?.data;

                setAreas(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                Notification("error", "Lấy danh sách khu vực thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, name, page])

    const handleFilter = (e: any) => {
        setName(e || ``);
    }

    const handleUpdateStatus = (table: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...table,
                }
                await dispatch(updateArea(body)).unwrap();

                setAreas((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return table;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái khu vực thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái khu vực thất bại", dispatch);
            }
        };

        alert2(
            "Update",
            "question",
            true,
            "Xác nhận",
            "#f55858",
            true,
            "Huỷ bỏ",
            "#000",
            "Cập nhật khu vực",
            "Bạn có muốn cập nhật trạng thái của khu vực không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableArea handleUpdateStatus={handleUpdateStatus} data={areas} />
            <div className='mt-4'>
                <BasePagination page={page} total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Area