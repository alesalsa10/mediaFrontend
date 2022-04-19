import { Grid, Typography, Alert, Box, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';

const { default: axios } = require('axios');

export default function Favorites() {
  const authData = useSelector((state) => state.auth);
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const getFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/favorites/all`, {
        headers: {
          Authorization: `Token ${authData.accessToken}`,
        },
      });
      console.log(response.data);
      setState({
        loading: false,
        response: response.data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    getFavorites();
    setState({
      loading: true,
      error: null,
      response: null,
    });
  }, []);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>
            <Skeleton width={200} height={25} animation='wave' sx={{ mb: 2 }} />
            <Box
              sx={{
                py: 0,
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                gap: '10px',
              }}
            >
              <>
                {[...Array(15).keys()].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ backgroundColor: 'background.paper', mb: 2 }}
                  >
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2, backgroundColor: 'background.paper' }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'85%'}
                      height={16}
                      sx={{ mb: 2, mx: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'70%'}
                      height={10}
                      sx={{ mb: 2, mx: 1 }}
                    />
                  </Box>
                ))}
              </>
            </Box>
            <Skeleton width={200} height={25} animation='wave' sx={{ mb: 2 }} />
            <Box
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                gap: '10px',
              }}
            >
              <>
                {[...Array(15).keys()].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ backgroundColor: 'background.paper', mb: 2 }}
                  >
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2, backgroundColor: 'background.paper' }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'85%'}
                      height={16}
                      sx={{ mb: 2, mx: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'70%'}
                      height={10}
                      sx={{ mb: 2, mx: 1 }}
                    />
                  </Box>
                ))}
              </>
            </Box>
            <Skeleton width={200} height={25} animation='wave' sx={{ mb: 2 }} />
            <Box
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                gap: '10px',
              }}
            >
              <>
                {[...Array(15).keys()].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ backgroundColor: 'background.paper', mb: 2 }}
                  >
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2, backgroundColor: 'background.paper' }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'85%'}
                      height={16}
                      sx={{ mb: 2, mx: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'70%'}
                      height={10}
                      sx={{ mb: 2, mx: 1 }}
                    />
                  </Box>
                ))}
              </>
            </Box>
          </>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <>
            <Grid container sx={{ color: 'text.primary' }}>
              {state.response.movies &&
              state.response.movies.length === 0 &&
              state.response.Tv &&
              state.response.Tv.length === 0 &&
              state.response.books &&
              state.response.books.length === 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    mt: '2rem',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <Typography variant='h6'>
                    You haven't added anything to you favorites
                  </Typography>
                </Box>
              ) : (
                <>
                  {state.response.movies && state.response.movies.length > 0 ? (
                    <>
                      <Grid item xs={12} py={1}>
                        <Typography varaint='h6'>Favorite Movies</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
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
                          {state.response.movies.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <Card
                                  key={media.title + index}
                                  mediaType={'movie'}
                                  media={media}
                                  type='carousel'
                                />
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Grid container>
                      <Grid item xs={12} py={1}>
                        <Typography variant='h5'>
                          {' '}
                          No Movies in your Favorites
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  {state.response.Tv && state.response.Tv.length > 0 ? (
                    <>
                      <Grid item xs={12} py={1}>
                        <Typography varaint='h6'>Favorite TV Series</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
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
                          {state.response.Tv.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <Card
                                  key={media.name + index}
                                  mediaType={'tv'}
                                  media={media}
                                  type='carousel'
                                />
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Grid container>
                      <Grid item xs={12} py={1}>
                        <Typography variant='h5'>
                          {' '}
                          No TV Series in your Favorites
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  {state.response.books && state.response.books.length > 0 ? (
                    <>
                      <Grid item xs={12} py={1}>
                        <Typography variant='h6'>Favorite Books</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
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
                          {state.response.books.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <Card
                                  key={media.volumeInfo.title + index}
                                  mediaType={'book'}
                                  media={media}
                                  type='carousel'
                                />
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Grid container>
                      <Grid item xs={12} py={1}>
                        <Typography variant='h5'>
                          {' '}
                          No Books in your Favorites
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
