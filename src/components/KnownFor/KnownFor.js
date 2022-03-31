import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link as RouterLink } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';

export default function KnownFor({ data }) {
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

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
  return (
    <>
      <Typography variant='h6' component={'div'} sx={{ pt: '0.5rem' }}>
        Known For
      </Typography>{' '}
      <Swiper
        style={{ padding: '1rem 0px' }}
        modules={[Scrollbar]}
        spaceBetween={15}
        //loop={true}
        loopedSlides={1}
        slidesPerView='auto'
        scrollbar={{ draggable: true }}
      >
        {/* top 7 */}
        {data.slice(0, 6).map((media, index) => (
          <SwiperSlide
            key={media.id + index}
            style={{
              boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
              width: 'fit-content',
              height: 'auto',
              borderRadius: '3px',
            }}
          >
            <Card sx={{ boxShadow: 'none' }}>
              <Link
              component={RouterLink}
                to={`/${media.media_type}/${media.id}-${
                  media.media_type === 'movie'
                    ? media.title.split(' ').join('-')
                    : media.name.split(' ').join('-')
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
                  alt={media.name}
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
                  to={`/${media.media_type}/${media.id}-${
                    media.media_type === 'movie'
                      ? media.title.split(' ').join('-')
                      : media.name.split(' ').join('-')
                  }`}
                  variant='inherit'
                  color='inherit'
                  underline='none'
                  sx={{ ':hover': { color: 'primary.main' } }}
                >
                  <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    sx={{ px: 0.5 }}
                  >
                    {media.media_type === 'movie' ? media.title : media.name}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
