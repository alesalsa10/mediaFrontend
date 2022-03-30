import {
  Grid,
  Typography,
} from '@mui/material';
import React, { } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Card from '../Card/Card';

export default function Recommendation({ recommendations }) {

  return (
    <>
      <Grid container>
        <Grid item sx={{ px: 3, pt: 3 }}>
          <Typography component={'h2'} variant='hy'>
            Recommendations
          </Typography>
        </Grid>
      </Grid>
      {recommendations.length > 0 ? (
        <>
          <Grid item sx={{ p: 3 }} xs={12}>
            <div className={`swiper-container ${'actors'}`}>
              <Swiper
                style={{ padding: '1rem 0px' }}
                modules={[Scrollbar]}
                spaceBetween={15}
                //loop={true}
                loopedSlides={1}
                slidesPerView='auto'
                //navigation
                scrollbar={{ draggable: true }}
              >
                {recommendations.map((media, index) => (
                  <SwiperSlide
                    key={
                      media.media_type === 'movie' ? media.title : media.name
                    }
                    style={{
                      boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                      width: 'fit-content',
                      height: 'auto',
                      borderRadius: '3px',
                    }}
                  >
                    <Card
                      mediaType={media.media_type}
                      media={media}
                      type='carousel'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Grid>
        </>
      ) : (
        <Typography sx={{ textAlign: 'left', m: 1 }}>
          No recommendations available
        </Typography>
      )}
    </>
  );
}
