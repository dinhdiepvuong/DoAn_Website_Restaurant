import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableDrink from '../base/table/BaseTableDrink'
import BoxSearch from '../components/drink/BoxSearch'
import { DrinkType } from '../interfaces';
import { findAllProducts, updateProduct } from '../redux/slices/productSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification, PRODUCT_TYPE } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Drink() {
    const dispatch = useDispatch<AppDispatch>();
    const [drinks, setDrinks] = useState<DrinkType[]>([]);
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
                    type: PRODUCT_TYPE.DRINK,
                    name,
                }

                const result: any = await dispatch(findAllProducts(params)).unwrap();

                const { data, pagination } = result?.data;

                setDrinks(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách đồ uống thất bại",
                        type: "error",
                    })
                );
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, name, page])

    const handleFilter = (e: any) => {
        setName(e || ``);
    }

    const handleUpdateStatus = (drink: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...drink,
                }
                await dispatch(updateProduct(body)).unwrap();

                setDrinks((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return drink;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái đồ uống thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái đồ uống thất bại", dispatch);
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
            "Cập nhật đồ uống",
            "Bạn có muốn cập nhật trạng thái của đồ uống không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableDrink handleUpdateStatus={handleUpdateStatus} data={drinks} />
            <div className='mt-4'>
                <BasePagination total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Drink