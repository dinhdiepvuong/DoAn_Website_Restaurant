import { Icon } from '@iconify/react';
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { authAuthSelector } from '../redux/slices/authSlice';
import { primaryColor } from '../theme';
import { genAddress, genGender } from '../utils';

const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
`

const Background = styled.img`
    width: 100%;
    height: 350px;
`;

const AvatarUser = styled.img`
    width: 250px;
    height: 250px;
    outline: 10px solid #fff;
    margin-top: -100px;
    border-radius: 50%;
`;

const BoxGender = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${primaryColor};
    border-radius: 20px;
`

function Info({ icon, value, label }: { icon: any, value: any, label: any }) {
    const Wrapper = styled.div`
    width: 100%;
    display: flex;
    background: ${primaryColor};
    border-radius: 10px;
    padding: 30px 20px;
    border: 1px solid lightgrey
`;

    const WrapperIcon = styled.div`
        color: #fff;
        border-radius: 30px;
        border: 1px solid lightgrey;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
`;

    return (
        <div className="col-6 p-4">
            <Wrapper>
                <WrapperIcon>
                    <Icon style={{ width: '25px', height: '25px' }} icon={icon} />
                </WrapperIcon>
                <div style={{ marginLeft: '20px' }}>
                    <div className='font_family_bold color_white'>{label}</div>
                    <div className='font_family_bold color_white'>{value}</div>
                </div>
            </Wrapper>
        </div>
    );
}

function AdminDetail() {
    const auth = useSelector(authAuthSelector);

    return (
        <>
            <Wrapper>
                <div style={{ paddingBottom: '10px' }} className='w100_per bg_white'>
                    <Background src="https://firebasestorage.googleapis.com/v0/b/restaurant-1a957.appspot.com/o/background_restaurant_VL.jpg?alt=media&token=a27f6f39-7921-4f5b-a12e-2ea3cfdb2d45" />
                    <div className='row m-0 p-0 w100_per'>
                        <div className='col-4 w100_per d-flex align-items-center justify-content-center'>
                            <AvatarUser src={auth?.user?.avatar} alt="Avatar" />
                        </div>
                        <div className='col-6 p-3'>
                            <div>
                                <div className='font25 font_family_bold'>{auth?.user?.name}</div>
                                <div className='mt-3 d-flex align-items-center w100_per'>
                                    <Icon className='icon25x25 color_primary' icon="cil:clock" />
                                    <div className='ml_10px font17 font_family_bold'>Ngày vào làm {moment(auth?.user?.createAt).format(`DD/MM/YYYY`)}</div>
                                </div>
                                <div className='mt-3 d-flex align-items-center w100_per'>
                                    <Icon className='icon25x25 color_primary' icon="clarity:calendar-line" />
                                    <div className='ml_10px font17 font_family_bold'>Ngày sinh {moment(auth?.user?.birthday).format(`DD/MM/YYYY`)}</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 p-2'>
                            <BoxGender>
                                <Icon
                                    style={{ color: '#fff', width: '25px', height: '25px' }}
                                    icon={auth?.user?.gender === 'Nam' ? `bi:gender-male` : `bi:gender-female`}
                                />
                                <div
                                    style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        marginLeft: '5px',
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    {genGender(auth?.user?.gender)}
                                </div>
                            </BoxGender>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <div className='row' style={{ marginTop: '10px', marginLeft: '15px' }}>

                <div className='d-flex align-items-center row box_shadow_card bg_profile p-4 border_radius_3'>
                    <div className='col-12 col-lg-12 p-2 column'>
                        <label className='col-6 col-lg-2 font_family_bold font22' htmlFor="">Tên đăng nhập:</label>
                        <span className='col-lg-9 font20'>{auth?.user?.username || 'Trống'}</span>
                    </div>
                    <div className='col-12 col-lg-12 p-2 column'>
                        <label className='col-6 col-lg-2 font_family_bold font22' htmlFor="">CMND/CCCD:</label>
                        <span className='col-lg-9 font20'>{auth?.user?.identity || 'Trống'}</span>
                    </div>
                    <div className='col-12 col-lg-12 p-2 column'>
                        <label className='col-6 col-lg-2 font_family_bold font22' htmlFor="">Email:</label>
                        <span className='col-lg-9 font20'>{auth?.user?.email || 'Trống'}</span>
                    </div>
                    <div className='col-12 col-lg-12 p-2 column'>
                        <label className='col-6 col-lg-2 font_family_bold font22' htmlFor="">Số điện thoại:</label>
                        <span className='col-lg-9 font20'>{auth?.user?.phone || 'Trống'}</span>
                    </div>
                    <div className='col-12 col-lg-12 p-2 column'>
                        <label className='col-6 col-lg-2 font_family_bold font22' htmlFor="">Địa chỉ:</label>
                        <span className='col-lg-9 font20'>{genAddress(auth?.user?.address) || 'Trống'}</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminDetail