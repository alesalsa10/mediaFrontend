import {
  Box,
  Card,
  CardContent,
  //CardMedia,
  Link,
  Typography,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function KnownFor({ data }) {
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const [width, setWidth] = useState();
  const refElement = useRef();

  // const getListSize = () => {
  //   const newWidth = refElement.current.clientWidth;
  //   setWidth(newWidth);
  // };

  // const handleImageLoad = (event) => {
  //   setWidth(event.target.clientWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleImageLoad);
  //   window.addEventListener('resize', getListSize);

  //   return () => {
  //     window.removeEventListener('resize', handleImageLoad);
  //     window.removeEventListener('resize', getListSize);
  //   };
  // }, []);
  return (
    <>
      <Typography variant='h6' component={'div'} sx={{ pt: '0.5rem' }}>
        Known For
      </Typography>{' '}
      <Box
        className={'scrollList'}
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          gap: '10px',
        }}
      >
        {/* top 7 */}
        {data.slice(0, 6).map((media, index) => (
          <Card
            sx={{
              overflow: 'visible',
              backgroundColor: 'background.paper',
              color: 'text.primary',
              display: 'flex',
              flexDirection: 'column',
              minWidth: {
                xs: 150,
                sm: 200,
              },
              maxWidth: {
                xs: 150,
                sm: 200,
              },
            }}
            key={media.id + index}
          >
            <Link
              component={RouterLink}
              to={`/${media.media_type}/${media.id}--${
                media.media_type === 'movie'
                  ? media.title.split(' ').join('-')
                  : media.name.split(' ').join('-')
              }`}
            >
              <Box
                ref={refElement}
                //onLoad={handleImageLoad}
                component={LazyLoadImage}
                src={
                  !media.poster_path
                    ? placeholder
                    : `${baseImgUrl}${media.poster_path}`
                }
                alt={media.name}
                sx={{
                  // width: {
                  //   xs: 130,
                  //   sm: 170,
                  // },
                  width: '100%',
                  height: {
                    xs: 225,
                    sm: 300,
                  },
                }}
              />
            </Link>

            <CardContent
              sx={{
                width: width,
                px: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to={`/${media.media_type}/${media.id}--${
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
        ))}
      </Box>
    </>
  );
}
