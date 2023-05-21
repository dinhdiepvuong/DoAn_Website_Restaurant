import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { findOneTable } from '../redux/slices/tableSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';

function TableDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [table, setTable] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const result: any = await dispatch(findOneTable(id)).unwrap();

                const { table } = result?.data;
                if (table)
                    setTable(table);
                else
                    navigate("/tables/list");
            } catch (error) {
                navigate("/tables/list");
                Notification("error", "Lấy thông tin bàn thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/tables/list");
    }


    return (
        <>
            <div className="font20 font_family_bold mt-2">Chi tiết bàn</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Thông tin</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Thông tin danh sách bàn
                    </div>
                </div>
                <div className='col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4'>
                    <div className="font_family_bold_italic font14">
                        Khu vực
                    </div>
                    <div className='d-flex align-items-center mt-2'>
                        <Avatar url={table?.area?.avatar} shape="rectangle" size={60} />
                        <div className='ml_10px font14 font_family_bold_italic'>{table?.area?.name}</div>
                    </div>
                    <div className="font_family_bold_italic font14 mt-4">Tên bàn</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Tên bàn"
                        type="text"
                        disabled
                        value={table?.name}
                    />
                    <div className="font_family_bold_italic font14 mt-4">Số người tối đa</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Số người tối đa"
                        type="text"
                        disabled
                        value={table?.quantity}
                    />
                </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
                <button
                    onClick={handleBack}
                    type="button"
                    className="btn bg_primary font14 font_family_bold color_white"
                >
                    Quay lại
                </button>
            </div>
        </>
    )
}

export default TableDetail