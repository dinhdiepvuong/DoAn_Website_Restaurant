import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    handleFilter: (text: string) => void
}
function BoxSearch({ handleFilter }: Props) {
    const [search, setSearch] = useState<string>('');

    return (
        <div className='d-flex align-items-center row box_shadow_card bg_white p-4 border_radius_3'>
            <div className='col-12 col-lg-12 font_family_bold font25 d-flex justify-content-center mb-5'>Khu vực</div>
            <div className='mt-md-2 mt-lg-0 col-12 col-lg-12 d-flex align-items-center justify-content-center'>
                <input onChange={(e) => setSearch(e?.target?.value || '')} onKeyDown={(e: any) => e?.key === "Enter" && handleFilter(e?.target?.value)} placeholder='Nhập thông tin tìm kiếm' className='h40_px mr_10px w50_per' type="text" />
                <button onClick={() => handleFilter(search)} className='btn bg_primary font16 font_family_bold color_white'>Tìm kiếm</button>
            </div>
        </div>
    )
}

export default React.memo(BoxSearch);