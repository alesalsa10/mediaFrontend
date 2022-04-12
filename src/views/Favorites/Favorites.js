import { Grid, Typography, Alert, Box, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
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
    // setState({
    //   loading: true,
    //   error: null,
    //   response: null,
    // });
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
                  <Box key={index}>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={130}
                      height={16}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={110}
                      height={10}
                      sx={{ mb: 2 }}
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
                  <Box key={index}>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={130}
                      height={16}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={110}
                      height={10}
                      sx={{ mb: 2 }}
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
                  <Box key={index}>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={150}
                      height={250}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={130}
                      height={16}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={110}
                      height={10}
                      sx={{ mb: 2 }}
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
            <Grid container>
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
                      <Grid item xs={12}>
                        <Typography>Favorite Movies</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
                        <Swiper
                          style={{ padding: '1rem 0px' }}
                          modules={[Scrollbar]}
                          spaceBetween={15}
                          loopedSlides={1}
                          slidesPerView='auto'
                          scrollbar={{ draggable: true }}
                        >
                          {state.response.movies.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <SwiperSlide
                                  key={media.title + index}
                                  style={{
                                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                                    width: 'fit-content',
                                    height: 'auto',
                                    borderRadius: '3px',
                                  }}
                                >
                                  <Card
                                    mediaType={'movie'}
                                    media={media}
                                    type='carousel'
                                  />
                                </SwiperSlide>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Swiper>
                      </div>
                    </>
                  ) : (
                    <Grid>
                      <Typography variant='h4'>
                        {' '}
                        No Movies in your Favorites
                      </Typography>
                    </Grid>
                  )}
                  {state.response.Tv && state.response.Tv.length > 0 ? (
                    <>
                      <Grid item xs={12}>
                        <Typography>Favorite TV Series</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
                        <Swiper
                          style={{ padding: '1rem 0px' }}
                          modules={[Scrollbar]}
                          spaceBetween={15}
                          loopedSlides={1}
                          slidesPerView='auto'
                          scrollbar={{ draggable: true }}
                        >
                          {state.response.Tv.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <SwiperSlide
                                  key={media.name + index}
                                  style={{
                                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                                    width: 'fit-content',
                                    height: 'auto',
                                    borderRadius: '3px',
                                  }}
                                >
                                  <Card
                                    mediaType={'tv'}
                                    media={media}
                                    type='carousel'
                                  />
                                </SwiperSlide>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Swiper>
                      </div>
                    </>
                  ) : (
                    <Grid>
                      <Typography variant='h4'>
                        {' '}
                        No TV Series in your Favorites
                      </Typography>
                    </Grid>
                  )}
                  {state.response.books && state.response.books.length > 0 ? (
                    <>
                      <Grid item xs={12}>
                        <Typography>Favorite Books</Typography>
                      </Grid>
                      <div className={`swiper-container movies`}>
                        <Swiper
                          style={{ padding: '1rem 0px' }}
                          modules={[Scrollbar]}
                          spaceBetween={15}
                          loopedSlides={1}
                          slidesPerView='auto'
                          scrollbar={{ draggable: true }}
                        >
                          {state.response.books.map((media, index) => (
                            <React.Fragment key={media.title + index}>
                              {!media.error ? (
                                <SwiperSlide
                                  key={media.volumeInfo.title + index}
                                  style={{
                                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                                    width: 'fit-content',
                                    height: 'auto',
                                    borderRadius: '3px',
                                  }}
                                >
                                  <Card
                                    mediaType={'book'}
                                    media={media}
                                    type='carousel'
                                  />
                                </SwiperSlide>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          ))}
                        </Swiper>
                      </div>
                    </>
                  ) : (
                    <Grid>
                      <Typography variant='h4'>
                        {' '}
                        No Books in your Favorites
                      </Typography>
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
