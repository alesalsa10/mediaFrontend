import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

import placeholder from '../../assets/placeholder.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default function TopBillCast({ cast, mediaType, mediaId, params }) {
  const [width, setWidth] = useState();
  const refElement = useRef();

  const getListSize = () => {
    const newWidth = refElement.current.clientWidth;
    setWidth(newWidth);
  };

  const handleImageLoad = (event) => {
    setWidth(event.target.clientWidth);
  };

  const createFullCastLink = () => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      if (params.mediaType === 'movie') {
        return `/movie/${params.id}/full_cast`;
      } else {
        return `/tv/${params.id}/full_cast`;
      }
    } else if (params.seasonNumber && params.episodeNumber) {
      //getEpisode();
      return `/tv/${params.id}/seasons/${params.seasonNumber}/episodes/${params.episodeNumber}/full_cast`;
    } else if (params.seasonNumber) {
      //getSeason();
      return `/tv/${params.id}/seasons/${params.seasonNumber}/full_cast`;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleImageLoad);
    window.addEventListener('resize', getListSize);

    return () => {
      window.removeEventListener('resize', handleImageLoad);
      window.removeEventListener('scroll', getListSize);
    };
  }, []);

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <Grid container>
      <Grid item sx={{ px: 3, pt: 3 }}>
        <Typography component={'h2'} variant='hy'>
          Main Cast
        </Typography>
      </Grid>
      {cast.length > 0 ? (
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
                {cast.slice(0, 6).map((actor, index) => (
                  <SwiperSlide
                    key={actor.name}
                    style={{
                      boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                      width: 'fit-content',
                      height: 'auto',
                      borderRadius: '3px',
                    }}
                  >
                    {/* <Card mediaType='people' media={actor} type='carousel' /> */}
                    <Card sx={{ boxShadow: 'none' }}>
                      <Link
                        component={RouterLink}
                        to={`/person/${actor.id}-${actor.name
                          .split(' ')
                          .join('-')}`}
                      >
                        <CardMedia
                          ref={refElement}
                          onLoad={handleImageLoad}
                          component='img'
                          image={
                            !actor.profile_path
                              ? placeholder
                              : `${baseImgUrl}${actor.profile_path}`
                          }
                          alt={actor.name}
                          sx={{
                            width: {
                              xs: 130,
                              sm: 170,
                            },
                          }}
                        />
                      </Link>

                      <CardContent sx={{ width: width, px: 0 }}>
                        <Link
                          component={RouterLink}
                          to={`/person/${actor.id}`}
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
                            {actor.name}
                          </Typography>
                        </Link>

                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ px: 0.5 }}
                        >
                          {actor.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Grid>
          <Grid item px={3}>
            <Link
              component={RouterLink}
              to={createFullCastLink()}
              variant='inherit'
              color='inherit'
              underline='none'
              sx={{ ':hover': { color: 'primary.main' } }}
            >
              <Typography gutterBottom variant='h6' component='div'>
                View Full Cast & Crew
              </Typography>
            </Link>
          </Grid>
        </>
      ) : (
        <Typography sx={{ textAlign: 'left', m: 1 }}>
          No cast information available
        </Typography>
      )}
    </Grid>
  );
}
