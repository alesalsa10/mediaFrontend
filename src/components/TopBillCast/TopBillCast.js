import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import React, { useState, useRef, useEffect } from 'react';

import placeholder from '../../assets/placeholder.png';

export default function TopBillCast({ cast, mediaType, mediaId, params }) {
  const [width, setWidth] = useState();
  const refElement = useRef();

  const getListSize = () => {
    // const newWidth = refElement.current.clientWidth;
    // setWidth(newWidth);

    if (refElement && refElement.current) {
      const newWidth = refElement.current.clientWidth;
      setWidth(newWidth);
    }
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
      <Grid item sx={{ pt: 3 }}>
        <Typography
          component={'h2'}
          variant='h5'
          sx={{ color: 'text.primary' }}
        >
          Main Cast
        </Typography>
      </Grid>
      {cast.length > 0 ? (
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
              {cast.slice(0, 6).map((actor, index) => (
                <Card
                  key={index}
                  sx={{
                    overflow: 'visible',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 4,
                  }}
                >
                  <Link
                    sx={{ width: 'fit-content' }}
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

                  <CardContent
                    sx={{
                      height: '100%',
                      width: width,
                      px: 0,
                      alignContent: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
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
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Link
              component={RouterLink}
              to={createFullCastLink()}
              variant='inherit'
              color='inherit'
              underline='none'
              sx={{ ':hover': { color: 'primary.main' } }}
            >
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                sx={{ color: 'text.primary' }}
              >
                View Full Cast & Crew
              </Typography>
            </Link>
          </Grid>
        </>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'left', my: 1 }}>
              No cast information available
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
