import { Grid, Typography } from '@mui/material';
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
  }, []);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>loading</>
        ) : !state.loading && state.error ? (
          <>error</>
        ) : (
          <>
            <Grid cotnainer>
              <Grid item xs={12}>
                <Typography>Favorite Movies</Typography>
              </Grid>
              {state.response.movies && state.response.movies.length > 0 ? (
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
                      <>
                        {!media.error ? (
                          <SwiperSlide
                            key={
                              // mediaType === 'movie' || mediaType === 'book'
                              //   ? media.title + index
                              //   : media.name + index
                              media.title + index
                            }
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
                      </>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <Grid>
                  <Typography> No movies in your favorites</Typography>
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Favorite TV Series</Typography>
              </Grid>
              {state.response.Tv && state.response.Tv.length > 0 ? (
                <div className={`swiper-container tv`}>
                  <Swiper
                    style={{ padding: '1rem 0px' }}
                    modules={[Scrollbar]}
                    spaceBetween={15}
                    loopedSlides={1}
                    slidesPerView='auto'
                    scrollbar={{ draggable: true }}
                  >
                    {state.response.Tv.map((media, index) => (
                      <>
                        {!media.error ? (
                          <SwiperSlide
                            key={
                              // mediaType === 'movie' || mediaType === 'book'
                              //   ? media.title + index
                              //   : media.name + index
                              media.name + index
                            }
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
                      </>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <Grid>
                  <Typography> No TV Series in your favorites</Typography>
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Favorite Books</Typography>
              </Grid>
              {state.response.books && state.response.books.length > 0 ? (
                <div className={`swiper-container tv`}>
                  <Swiper
                    style={{ padding: '1rem 0px' }}
                    modules={[Scrollbar]}
                    spaceBetween={15}
                    loopedSlides={1}
                    slidesPerView='auto'
                    scrollbar={{ draggable: true }}
                  >
                    {state.response.books.map((media, index) => (
                      <>
                        {!media.error ? (
                          <SwiperSlide
                            key={
                              media.title + index
                            }
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
                      </>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <Grid>
                  <Typography> No Books in your favorites</Typography>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
