import {
  Grid,
  Typography,
} from '@mui/material';
import React, { } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
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
                style={{ padding: '1px 0px' }}
                modules={[Navigation]}
                spaceBetween={15}
                loop={true}
                loopedSlides={1}
                slidesPerView='auto'
                navigation
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
                    <Card  mediaType={media.media_type} media={media} type='carousel'/>
                    {/* <Card sx={{ boxShadow: 'none' }}>
                      <Link
                        href={`/${media.media_type}/${selectMediaLink(media)}`}
                      >
                        <CardMedia
                          ref={refElement}
                          onLoad={handleImageLoad}
                          component='img'
                          image={
                            !media.poster_path
                              ? placeholder
                              : `${baseImgUrl}${media.poster_path}`
                          }
                          alt={
                            media.media_type === 'movie'
                              ? media.title
                              : media.name
                          }
                          sx={{
                            width: { xs: 130, sm: 170 },
                          }}
                        />
                      </Link>

                      <CardContent sx={{ width: width, px: 0}}>
                        <Link
                          href={`/${media.media_type}/${selectMediaLink(
                            media
                          )}`}
                          variant='inherit'
                          color='inherit'
                          underline='none'
                          sx={{ ':hover': { color: 'primary.main' } }}
                        >
                          <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{ px: 0.5 }}
                          >
                            {media.media_type === 'movie'
                              ? media.title
                              : media.name}
                          </Typography>
                        </Link>
                      </CardContent>
                    </Card> */}
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
