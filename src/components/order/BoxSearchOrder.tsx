import { Icon } from '@iconify/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    handleFilter: (text: string) => void;
}
function BoxSearchOrder({ handleFilter }: Props) {
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }
    return (
        <div className="box_shadow_card bg_white p-4 border_radius_3">
            <div className="row p-0 m-0">
                <div className='col-12 col-lg-12 d-flex justify-content-center mb-5 font_family_bold font25'>Hoá đơn</div>
                <div className='mt-md-2 mt-lg-0 col-12 col-lg-9 d-flex align-items-center justify-content-end'>
                    <input onChange={(e) => setSearch(e?.target?.value || '')} onKeyDown={(e: any) => e?.key === "Enter" && handleFilter(e?.target?.value)} placeholder='Nhập số điện thoại khách hàng' className='h40_px mr_10px w50_per' type="text" />
                    <button onClick={() => handleFilter(search)} className='btn bg_primary font18 font_family_bold color_white'>Tìm kiếm</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BoxSearchOrder);