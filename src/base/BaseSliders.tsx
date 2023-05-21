import React, { FC, useRef } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { primaryColor } from '../theme';

type Props = {
    style?: any;
    sliderPerView?: any,
    spaceBetween?: number,
    onSlideChange?: () => void;
    onSwiper?: (swiper: any) => void;
    children: React.ReactNode,
    responsive?: any,
    loop?: boolean,
    autoplay?: boolean
}
const IconNavigate = styled.div`
    top: 85px;
    z-index: 2
`;

const Wrapper = styled(Swiper)`
    .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: 0px !important;
    }
    .swiper-pagination-bullet-active {
        background: ${primaryColor} !important;
    }
`;

SwiperCore.use([Navigation]);

const BaseSliders: FC<Props> = ({ style = {}, autoplay = true, loop = true, sliderPerView = "auto", onSlideChange, onSwiper, spaceBetween = 50, children, responsive = {
    "@0.00": {
        slidesPerView: 1,
        spaceBetween: 5,
    },
    "@0.75": {
        slidesPerView: 2,
        spaceBetween: 5,
    },
    "@1.00": {
        slidesPerView: 3,
        spaceBetween: 5,
    },
    "@1.50": {
        slidesPerView: 3,
        spaceBetween: 5,
    },
} }: Props) => {

    return (
        <Wrapper
            slidesPerView={sliderPerView}
            spaceBetween={30}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
            style={style}
        >
            {children}
        </Wrapper>
    )
}

export default BaseSliders