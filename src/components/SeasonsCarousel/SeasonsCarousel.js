import {
  Grid,
  Typography,
  Card,
  Link,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import placeholder from '../../assets/placeholder.png';

export default function SeasonsCarousel({ seasons }) {
  const [width, setWidth] = useState();
  const [filtered, setFiltered] = useState([]);
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

    return () => {
      window.removeEventListener('resize', handleImageLoad);
      window.removeEventListener('scroll', getListSize);
    };
  }, []);
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const location = useLocation();

  useEffect(() => {
    const filsteredSeasons = seasons.filter(
      (season) => !isNaN(season.name.split(' ')[1])
    );
    setFiltered(filsteredSeasons);
  }, [seasons]);

  //console.log(seasons, filsteredSeasons);
  return (
    <>
      <Grid container>
        <Grid item sx={{ pt: 3 }}>
          <Typography
            component={'h2'}
            variant='h5'
            sx={{ color: 'text.primary' }}
          >
            Seasons
          </Typography>
        </Grid>
      </Grid>
      {filtered.length > 0 ? (
        <>
          <Grid item sx={{ py: 3 }} xs={12}>
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
              {filtered.map((media, index) => (
                <Card
                  sx={{
                    overflow: 'visible',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 4
                  }}
                  key={media.media_type === 'movie' ? media.title : media.name}
                >
                  <Link
                    component={RouterLink}
                    to={`${location.pathname}/seasons/${
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
                      alt={media.name}
                      sx={{
                        width: { xs: 130, sm: 170 },
                      }}
                    />
                  </Link>

                  <CardContent sx={{ width: width, px: 0 }}>
                    <Link
                      component={RouterLink}
                      to={`${location.pathname}/seasons/${
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
              ))}
            </Box>
          </Grid>
        </>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'left', my: 1 }}>
              No Seasons found
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
