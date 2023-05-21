import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    handleFilter: (name: string, phone: string, email: string) => void
}
function BoxSearch({ handleFilter }: Props) {
    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleClearForm = () => {
        handleFilter('', '', '');
        setPhone('');
        setName('');
        setEmail('');
    }

    return (
        <div className='d-flex align-items-center row box_shadow_card bg_white p-4 border_radius_3 mx-1'>
            <div className='col-12 col-lg-12 d-flex mb-5 justify-content-center font_family_bold font25'>Khách hàng</div>

            <div className='col-12 col-lg-12 p-2'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Tên khách hàng</label>
                <input value={name} onChange={(e) => setName(e?.target?.value || '')} placeholder='Nhập tên khách hàng' className='col-lg-9 h40_px mr_10px w100_per' type="text" />
            </div>
            <div className='col-12 col-lg-12 p-2'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Số điện thoại khách hàng</label>
                <input value={phone} onChange={(e) => setPhone(e?.target?.value || '')} placeholder='Nhập số điện thoại khách hàng' className='col-lg-9 h40_px mr_10px w100_per' type="text" />
            </div>
            <div className='mt-lg-0 col-12 col-lg-12 p-2 mb-3'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Email khách hàng</label>
                <input value={email} onChange={(e) => setEmail(e?.target?.value || '')} placeholder='Nhập email khách hàng' className='col-lg-9 h40_px mr_10px w100_per w100_per' type="text" />
            </div>
            <div className='mt-md-2 mt-lg-0 col-12 col-lg-12 d-flex align-items-center justify-content-end'>
                <button onClick={handleClearForm} className='btn bg_red p-2 font20 font_family_bold color_red mx-2'>Làm mới</button>
                <button onClick={() => handleFilter(name, phone, email)} className='btn bg_primary p-2 font20 font_family_bold color_white'>Tìm kiếm</button>
            </div>
        </div>
    )
}

export default React.memo(BoxSearch);