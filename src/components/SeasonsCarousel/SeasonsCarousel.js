import {
  Grid,
  Typography,
  Card,
  Link,
  CardMedia,
  CardContent,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Card from '../Card/Card'
import { useLocation } from 'react-router-dom';

import placeholder from '../../assets/placeholder.png';

export default function SeasonsCarousel({ seasons, name }) {
  const [width, setWidth] = useState();
  const refElement = useRef();

  const getListSize = () => {
    const newWidth = refElement.current.clientWidth;
    setWidth(newWidth);
  };

  const handleImageLoad = (event) => {
    setWidth(event.target.clientWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleImageLoad);
    window.addEventListener('resize', getListSize);
  }, []);
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const location = useLocation();
  console.log(location);
  const filsteredSeasons = seasons.filter(
    (season) => !isNaN(season.name.split(' ')[1])
  );
  console.log(seasons, filsteredSeasons);
  return (
    <>
      <Grid container>
        <Grid item sx={{ px: 3, pt: 3 }}>
          <Typography component={'h2'} variant='hy'>
            Seasons
          </Typography>
        </Grid>
      </Grid>
      {filsteredSeasons.length > 0 ? (
        <>
          <Grid item sx={{ p: 3 }} xs={12}>
            <div className={`swiper-container ${'actors'}`}>
              <Swiper
                style={{ padding: '1px 0px' }}
                modules={[Navigation]}
                spaceBetween={15}
                //loop={true}
                loopedSlides={1}
                slidesPerView='auto'
                navigation
              >
                {filsteredSeasons.map((media, index) => (
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
                    {/* <Card  mediaType={'tv'} media={media} type='carousel'/> */}
                    <Card sx={{ boxShadow: 'none' }}>
                      <Link
                        href={`${location.pathname}/seasons/${
                          media.name.split(' ')[1]
                        }`}
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
                            media.name
                          }
                          sx={{
                            width: { xs: 130, sm: 170 },
                          }}
                        />
                      </Link>

                      <CardContent sx={{ width: width, px: 0 }}>
                        <Link
                          href={`${location.pathname}/seasons/${
                            media.name.split(' ')[1]
                          }`}
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
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Grid>
        </>
      ) : (
        <Typography sx={{ textAlign: 'left', my: 1, mx: 3 }}>
          No Seasons found
        </Typography>
      )}
    </>
  );
}
