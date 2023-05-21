import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableProductType from '../base/table/BaseTableProductType'
import BoxSearch from '../components/productType/BoxSearch'
import { ProductTypeType } from '../interfaces';
import { findAllProductTypes, updateProductType } from '../redux/slices/productTypeSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function ProductType() {
    const dispatch = useDispatch<AppDispatch>();
    const [productTypes, setProductTypes] = useState<ProductTypeType[]>([]);
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

                const result: any = await dispatch(findAllProductTypes(params)).unwrap();

                const { data, pagination } = result?.data;

                setProductTypes(data || []);

                setTotal(pagination[0]?.total);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách loại món ăn thất bại",
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

    const handleUpdateStatus = (productType: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...productType,
                }
                await dispatch(updateProductType(body)).unwrap();

                setProductTypes((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return productType;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái loại món ăn thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái loại món ăn thất bại", dispatch);
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
            "Cập nhật loại món ăn",
            "Bạn có muốn cập nhật trạng thái của loại món ăn không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableProductType data={productTypes} handleUpdateStatus={handleUpdateStatus} />
            <div className='mt-4'>
                <BasePagination total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default ProductType