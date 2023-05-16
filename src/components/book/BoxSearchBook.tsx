import { Icon } from '@iconify/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ORDER_STATUS } from '../../utils'
import SelectFilterByType from '../SelectFilterByType';
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import styled from 'styled-components'

registerLocale("vi", vi);

const WrapperDateTime = styled.div`
    width: 300px;
    .react-datepicker__input-container input {
        height: 40px;
        width: 300px;
    }
`

type Props = {
    handleFilter: (text: string) => void;
    handleFilterByType: (e: any) => void;
    dateRange: any[],
    handleChangeTime: (e: any) => void;
}

const option = [
    {
        label: "Tất cả",
        value: -1
    },
    {
        label: "Chưa sử dụng",
        value: ORDER_STATUS.NOT_USE
    },
    {
        label: "Đang sử dụng",
        value: ORDER_STATUS.USING
    },
    {
        label: "Đã sử dụng",
        value: ORDER_STATUS.USED
    },
    {
        label: "Đã quá hạn",
        value: ORDER_STATUS.CANCELED
    }
]

function BoxSearchBook({ handleFilter, handleFilterByType, dateRange, handleChangeTime }: Props) {
    const [isFilter, setIsFilter] = useState<boolean>(true);
    const [startDate, endDate] = dateRange;
    const [search, setSearch] = useState<string>('');

    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }

    return (
        <div className="box_shadow_card bg_white p-4 border_radius_3">
            <div className="row p-0 m-0">
                <div className='col-12 col-lg-12 d-flex justify-content-center font_family_bold font25 mb-5'>Đơn đặt bàn</div>
                <div className='mt-md-2 mt-lg-0 col-12 col-lg-12 d-flex align-items-center justify-content-center'>
                    <input onChange={(e) => setSearch(e?.target?.value || '')} onKeyDown={(e: any) => e?.key === "Enter" && handleFilter(e?.target?.value)} placeholder='Nhập số điện thoại khách hàng' className='h40_px mr_10px w50_per' type="text" />
                    <button onClick={() => handleFilter(search)} className='btn bg_primary font16 font_family_bold color_white'>Tìm kiếm</button>
                    <button
                        onClick={handleShowFilter}
                        className="d-flex align-items-center btn color_primary font_family_bold_italic font16"
                    >
                        {/* <span>Bộ lọc</span> */}
                        {/* <Icon
                            className={classNames(
                                "icon20x20 ml_5px",
                                { show: isFilter },
                                "icon_down_product"
                            )}
                            icon="akar-icons:arrow-down"
                        /> */}
                    </button>
                </div>
            </div>
            <div className={classNames({ show: isFilter }, "box_filter_product")}>
                <div className="divider_vertical_dashed"></div>
                <div className="mt-4">
                    <div className="row p-0 m-0">
                        <div className="col-12 col-lg-12 px-2">
                            <div className="font_14 font_family_bold_italic mb-2">
                                Lọc theo trạng thái đơn đặt bàn
                            </div>
                            <SelectFilterByType isSetDefaultValue={true} onChange={(e: any) => handleFilterByType(e.value)} option={option} width="300px" />
                        </div>
                        <div className="col-12 col-lg-12 px-2 mt-3">
                            <div className="font_14 font_family_bold_italic mb-2">
                                Lọc theo ngày đặt bàn
                            </div>
                            <WrapperDateTime>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update: any[]) => {
                                        handleChangeTime(update);
                                    }}
                                    locale="vi"
                                    isClearable
                                    maxDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText='Chọn thời gian'
                                    onCalendarClose={() => {
                                        if (!startDate || !endDate)
                                            handleChangeTime([null, null])
                                    }}
                                />
                            </WrapperDateTime>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default React.memo(BoxSearchBook);