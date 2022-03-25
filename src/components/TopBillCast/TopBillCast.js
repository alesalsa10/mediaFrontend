import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React, {useState, useRef, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import placeholder from '../../assets/placeholder.png';

import 'swiper/css';
import 'swiper/css/navigation';

export default function TopBillCast({ cast, mediaType, mediaId }) {
  const [width, setWidth] = useState();
  const refElement = useRef();

  const getListSize = () => {
    const newWidth = refElement.current.clientWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    getListSize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', getListSize);
  }, []);

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <Grid container>
      <Grid item sx={{ px: 3, pt: 3 }}>
        <Typography component={'h2'} variant='hy'>
          Top Billed Cast
        </Typography>
      </Grid>
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
            {cast.slice(0, 10).map((actor, index) => (
              <SwiperSlide
                key={actor.name}
                style={{
                  boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                  width: 'fit-content',
                  height: 'auto',
                  borderRadius: '3px',
                }}
              >
                {/* <Card mediaType={mediaType} media={media} type='carousel' /> */}
                <Card sx={{ boxShadow: 'none' }}>
                  <Link href={`/people/${actor.id}`}>
                    <CardMedia
                    ref={refElement}
                      component='img'
                      image={
                        !actor.profile_path
                          ? placeholder
                          : `${baseImgUrl}${actor.profile_path}`
                      }
                      alt={actor.name}
                      sx={{
                        width: {xs: 130, sm:170}
                      }}
                    />
                  </Link>

                  <CardContent sx={{width: width, px:0}}>
                    <Link
                      href={`/people/${actor.id}`}
                      variant='inherit'
                      color='inherit'
                      underline='none'
                      sx={{ ':hover': { color: 'primary.main' } }}
                    >
                      <Typography gutterBottom variant='h5' component='div' sx={{px:0.5}}>
                        {actor.name}
                      </Typography>
                    </Link>

                    <Typography variant='body2' color='text.secondary' sx={{px:0.5}}>
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
          href={`/${mediaType}/${mediaId}/full_cast`}
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
    </Grid>
  );
}
