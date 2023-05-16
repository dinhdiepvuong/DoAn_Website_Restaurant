import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableProduct from '../base/table/BaseTableProduct'
import BoxSearch from '../components/product/BoxSearch'
import { ProductType } from '../interfaces';
import { findAllProducts, updateProduct } from '../redux/slices/productSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Product() {
    const dispatch = useDispatch<AppDispatch>();
    const [products, setProducts] = useState<ProductType[]>([]);
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
                    name,
                }

                const result: any = await dispatch(findAllProducts(params)).unwrap();

                const { data, pagination } = result?.data;

                setProducts(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách món ăn thất bại",
                        type: "error",
                    })
                );
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, name, page])

    const handleFilter = (text: string) => {
        setName(text);
        setPage(1);
    }

    const handleUpdateStatus = (product: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...product,
                }
                await dispatch(updateProduct(body)).unwrap();

                setProducts((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return product;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái món ăn thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái món ăn thất bại", dispatch);
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
            "Cập nhật món ăn",
            "Bạn có muốn cập nhật trạng thái của món ăn không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableProduct data={products} handleUpdateStatus={handleUpdateStatus} />
            <div className='mt-4'>
                <BasePagination total={total} page={page} onChange={(e: any) => setPage(e)} />
            </div>
        </>
    )
}

export default Product