import {
  Grid,
  Typography,
  Card,
  Link,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
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

    return () => {
      window.removeEventListener('resize', handleImageLoad);
      window.removeEventListener('scroll', getListSize);
    };
  }, []);
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const params = useParams();

  return (
    <>
      <Grid container>
        <Grid item sx={{ pt: 3 }}>
          <Typography
            component={'h2'}
            variant='h6'
            sx={{ color: 'text.primary' }}
          >
            Episodes
          </Typography>
        </Grid>
      </Grid>
      {episodes.length > 0 ? (
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
              {episodes.map((media, index) => (
                <Card
                  sx={{
                    overflow: 'visible',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 4
                  }}
                  key={media.name}
                >
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
                        backgroundColor: '#a7a7a8',
                      }}
                    />
                  </Link>

                  <CardContent
                    sx={{
                      width: width,
                      px: 0,
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
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
              ))}
            </Box>
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
