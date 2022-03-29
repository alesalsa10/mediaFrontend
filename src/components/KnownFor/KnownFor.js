import React from 'react'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function KnownFor({data}) {
  return (
    <Swiper
      style={{ padding: '1px 0px' }}
      modules={[Navigation]}
      spaceBetween={15}
      loop={true}
      loopedSlides={1}
      slidesPerView='auto'
      navigation
    >
      {data.map((media, index) => (
        <SwiperSlide
          key={
            media.id + index
          }
          style={{
            boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
            width: 'fit-content',
            height: 'auto',
            borderRadius: '3px',
          }}
        >
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
