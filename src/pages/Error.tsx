import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';


function Error() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/dashboard');
  };
  return (
    <div className='mt-4'>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '200px' }}>OOPS!</div>
        <div
          style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}
        >
          <div style={{ fontSize: '100px' }}>4</div>
          <Icon style={{ width: '80px', height: '80px' }} icon="twemoji:sad-but-relieved-face" />
          <div style={{ fontSize: '100px' }}>4</div>
        </div>
        <div style={{ fontSize: '25px' }}>Không tìm thấy trang</div>
        <button className='btn bg_primary mt-4 color_white font_family_bold' onClick={goToHome}>Về trang chủ</button>
      </div>
    </div>
  );
}

export default Error;
