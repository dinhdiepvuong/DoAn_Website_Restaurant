import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    handleFilter: (name: string, phone: string, email: string) => void

}
function BoxSearch({ handleFilter }: Props) {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleClearForm = () => {
        handleFilter('', '', '');
        setPhone('');
        setName('');
        setEmail('');
    }

    return (
        <div className='d-flex align-items-center row box_shadow_card bg_white p-4 border_radius_3'>
            <div className='col-12 col-lg-12 d-flex justify-content-center font_family_bold font25 mb-5'>Nhân viên</div>
            <div className='col-12 col-lg-12 p-2'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Tên nhân viên:</label>
                <input value={name} onChange={(e) => setName(e?.target?.value || '')} placeholder='Nhập tên nhân viên' className='col-lg-9 h40_px mr_10px w100_per' type="text" />
            </div>
            <div className='col-12 col-lg-12 p-2'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Số điện thoại nhân viên:</label>
                <input value={phone} onChange={(e) => setPhone(e?.target?.value || '')} placeholder='Nhập số điện thoại nhân viên' className='col-lg-9 h40_px mr_10px w100_per' type="text" />
            </div>
            <div className='mt-lg-0 col-12 col-lg-12 p-2 mb-3'>
                <label className='col-12 col-lg-2 font_family_bold font15' htmlFor="">Email nhân viên:</label>
                <input value={email} onChange={(e) => setEmail(e?.target?.value || '')} placeholder='Nhập email nhân viên' className='col-lg-9 h40_px mr_10px w100_per w100_per' type="text" />
            </div>
            <div className='mt-md-4 mt-lg-0 col-12 col-lg-12 d-flex align-items-center justify-content-end'>
                <button onClick={handleClearForm} className='btn bg_red font20 font_family_bold color_red mx-2'>Làm mới</button>
                <button onClick={() => handleFilter(name, phone, email)} className='btn bg_primary font20 font_family_bold color_white'>Tìm kiếm</button>
            </div>
        </div>
    )
}

export default React.memo(BoxSearch);