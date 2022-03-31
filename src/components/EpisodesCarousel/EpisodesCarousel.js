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
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import placeholder from '../../assets/placeholder.png';

export default function EpisodesCarousel({ episodes }) {
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

  const params = useParams();

  return (
    <>
      <Grid container>
        <Grid item sx={{ px: 3, pt: 3 }}>
          <Typography component={'h2'} variant='hy'>
            Episodes
          </Typography>
        </Grid>
      </Grid>
      {episodes.length > 0 ? (
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
                {episodes.map((media, index) => (
                  <SwiperSlide
                    key={media.name}
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
                        component={RouterLink}
                        to={`/tv/${params.id}/seasons/${params.seasonNumber}/episodes/${media.episode_number}`}
                      >
                        <CardMedia
                          ref={refElement}
                          onLoad={handleImageLoad}
                          component='img'
                          image={
                            !media.still_path
                              ? placeholder
                              : `${baseImgUrl}${media.still_path}`
                          }
                          alt={media.name}
                          sx={{
                            width: { xs: 130, sm: 170 },
                          }}
                        />
                      </Link>

                      <CardContent sx={{ width: width, px: 0 }}>
                        <Link
                          component={RouterLink}
                          to={`/tv/${params.id}/seasons/${params.seasonNumber}/episodes/${media.episode_number}`}
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
          No Episodes found
        </Typography>
      )}
    </>
  );
}
