import { Icon } from '@iconify/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Modal } from 'rsuite'
import styled from 'styled-components';
import BaseSelect from '../../base/BaseSelect';
import BasePagination from '../../base/pagination';
import { FoodType, ProductType } from '../../interfaces';
import { findAllProducts } from '../../redux/slices/productSlice';
import { findAllProductTypes } from '../../redux/slices/productTypeSlice';
import themeSlice from '../../redux/slices/themeSlice';
import { AppDispatch } from '../../redux/store';
import { ENTITY_STATUS, ICON, Notification, PRODUCT_TYPE } from '../../utils';
import Avatar from '../Avatar';
import ProductItem from '../book/ProductItem';
import EmptyTable from '../EmptyTable';

const Wrapper = styled(Modal)`
    width: 1400px;
`;

const dataFilterByProductType = [
    {
        value: '',
        name: "Tất cả"
    },
    {
        value: PRODUCT_TYPE.FOOD,
        name: "Món ăn"
    },
    {
        value: PRODUCT_TYPE.DRINK,
        name: "Đồ uống"
    }
]


type ModalChooseProductForBookProps = {
    visible: boolean;
    handleClose: () => void;
    chosenProducts: any[];
    handleChoose: (product: any, quantity: number) => void;
}

function ModalChooseProductForBook({ handleClose, visible, chosenProducts, handleChoose }: ModalChooseProductForBookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [type, setType] = useState<any>('');
    const [option, setOption] = useState<any[]>([]);
    const [productType, setProductType] = useState<any>('');

    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }


    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page,
                    limit: 8,
                    status: ENTITY_STATUS.ACTIVATED,
                    name,
                    type,
                    productType
                }

                const result = await dispatch(findAllProducts(params)).unwrap();

                const { data, pagination } = result?.data;

                setProducts(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                Notification("error", "Lấy danh sách món ăn thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        if (visible)
            initData();
    }, [dispatch, page, visible, name, type, productType]);

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                }

                const result: any = await dispatch(findAllProductTypes(params)).unwrap();

                const { data } = result?.data;

                const dataProductType: any[] = [];

                (data || []).forEach((productType: any) => {
                    dataProductType.push({
                        value: {
                            avatar: productType?.avatar || '',
                            value: productType?.id,
                            name: productType?.name
                        },
                        label: productType?.name,
                    })
                })

                setOption(dataProductType.map((item, index) => {
                    item.label = (
                        <div className="d-flex align-items-center">
                            <Avatar shape='rectangle' size={30} url={item?.value?.avatar} />
                            <span className="ml_10px font14 font_family_bold">{item.label}</span>
                        </div>
                    );
                    return item;
                }));
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách loại món ăn thất bại",
                        type: "error",
                    })
                );
            }
        };

        if (visible) initData();
    }, [dispatch, visible]);

    const handleFilter = (text: string) => {
        setName(text);
        setPage(1);
    }

    const handleChooseProductType = (value: any) => {
        setProductType(value?.value?.value)
    }

    return (
        <Wrapper open={visible} onClose={handleClose} >
            <Modal.Header>
                <Modal.Title>
                    <div className='font16 font_family_bold'>Danh sách món ăn</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '570px' }}>
                <div className='m-3 row p-0'>
                    <div className='col-12 col-lg-3 font_family_bold font14'>Tìm kiếm món ăn</div>
                    <div className='mt-md-2 mt-lg-0 col-12 col-lg-9 d-flex align-items-center justify-content-end'>
                        <input onKeyDown={e => e?.key === "Enter" && handleFilter(search)} onChange={(e) => setSearch(e.target.value)} placeholder='Nhập thông tin tìm kiếm' className='h40_px mr_10px w50_per' type="text" />
                        <button onClick={() => handleFilter(search)} className='btn bg_primary color_white font12 font_family_bold h40_px'>Tìm kiếm</button>
                        <button
                            onClick={handleShowFilter}
                            className="d-flex align-items-center btn color_primary font_family_bold_italic font16"
                        >
                            <span>Bộ lọc</span>
                            <Icon
                                className={classNames(
                                    "icon20x20 ml_5px",
                                    { show: isFilter },
                                    "icon_down_product"
                                )}
                                icon="akar-icons:arrow-down"
                            />
                        </button>
                    </div>
                    <div className={classNames({ show: isFilter }, "box_filter_product")}>
                        <div className="divider_vertical_dashed"></div>
                        <div className="mt-4">
                            <div className="row p-0 m-0">
                                <div className="col-12 col-lg-6 px-2">
                                    <div className="font_14 font_family_bold_italic mb-2">
                                        Lọc theo trạng thái
                                    </div>
                                    <div>
                                        <BaseSelect data={dataFilterByProductType} onChange={(e: any) => setType(e)} />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 px-2">
                                    <div className="font_14 font_family_bold_italic mb-2">
                                        Lọc theo loại món ăn
                                    </div>
                                    <div>
                                        <Select
                                            // value={option.filter((option) => option.value.value === table.areaId)}
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    height: "40px",
                                                    marginTop: "8px",
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "#ddd",
                                                    primary50: "#ddd",
                                                    primary: "rgba(0,159,127)",
                                                },
                                            })}
                                            placeholder="Chọn loại món ăn"
                                            onChange={(value) => handleChooseProductType(value)}
                                            options={option}
                                            isClearable
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider_vertical_dashed my-3'></div>
                </div>
                {
                    isLoading ? <div>dsadsa</div>
                        :
                        <>
                            {
                                products.length === 0 ? <EmptyTable icon={ICON.PRODUCT} title="Không tìm thấy món ăn" />
                                    :
                                    <>
                                        <div className='row m-0 p-0'>
                                            {
                                                products.map((product, index: number) => <ProductItem handleChoose={handleChoose} product={product} key={product?.id} chosenProducts={chosenProducts} />)
                                            }
                                        </div>
                                        <div className='mt-4'>
                                            <BasePagination page={page} total={total} onChange={(e: any) => setPage(e)} />
                                        </div>
                                    </>
                            }
                        </>
                }
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='mt-2 border_black_1px bg_white border_radius_5 mr_10px px-4 py-2 font14 font_family_bold'>Đóng</button>
            </Modal.Footer>
        </Wrapper>
    )
}

export default React.memo(ModalChooseProductForBook);