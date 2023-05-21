import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { findOneArea } from '../redux/slices/areaSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';

function AreaDetail() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [area, setArea] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const initData = async () => {
            try {
                const result: any = await dispatch(findOneArea(id)).unwrap();

                const { area } = result?.data;
                if (area)
                    setArea(area);
                else
                    navigate("/areas/list");
            } catch (error) {
                navigate("/areas/list");
                Notification("error", "Lấy thông tin khu vực thất bại", dispatch);
            }
        }

        if (id) initData();
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/areas/list");
    }

    return (
        <>
            <div className="font20 font_family_bold mt-2">Chi tiết khu vực</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Thông tin</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Thêm thông tin của khu vực
                    </div>
                </div>
                <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                    <div className="font_family_bold_italic font14">Tên khu vực</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        placeholder="Tên khu vực"
                        type="text"
                        value={area?.name}
                        disabled
                    />
                    <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                    <textarea
                        placeholder="Mô tả khu vực"
                        className="w100_per mt-2"
                        rows={5}
                        value={area?.description || `Trống`}
                        disabled
                    ></textarea>
                    <div className="font_family_bold_italic font14 mt-4">Ảnh đại diện</div>
                    <div className='mt-4'>
                        <Avatar url={area?.avatar} shape="rectangle" size={100} />
                    </div>
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

export default AreaDetail