import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../base/pagination';
import BaseTableEmployee from '../base/table/BaseTableEmployee'
import BoxSearch from '../components/employee/BoxSearch'
import Pagination from '../components/Pagination'
import { EmployeeType } from '../interfaces';
import { findAllEmployees, updateEmployee } from '../redux/slices/employeeSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Employee() {
    const dispatch = useDispatch<AppDispatch>();
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page,
                    phone,
                }

                const result: any = await dispatch(findAllEmployees(params)).unwrap();

                const { data, pagination } = result?.data;

                setEmployees(data || []);

                setTotal(pagination[0]?.total);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách nhân viên thất bại",
                        type: "error",
                    })
                );
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, page, phone])

    const handleFilter = (name: string, phone: string, email: string) => {
        setName(name || '')
        setPhone(phone || '');
        setEmail(email || '');
    }

    const handleChangePage = (e: any) => {
        setPage(e || 1);
    }

    const handleUpdateStatus = (food: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...food,
                }
                await dispatch(updateEmployee(body)).unwrap();

                setEmployees((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return food;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái nhân viên thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái nhân viên thất bại", dispatch);
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
            "Cập nhật nhân viên",
            "Bạn có muốn cập nhật trạng thái của nhân viên không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableEmployee handleUpdateStatus={handleUpdateStatus} data={employees} />
            <BasePagination page={page} onChange={handleChangePage} total={total} />
        </>
    )
}

export default Employee