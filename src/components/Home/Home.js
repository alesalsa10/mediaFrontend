import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

const { default: axios } = require('axios');

export default function Home() {
  const [movieFilter, setMovieFilter] = useState('day');
  const [movieData, setMovieData] = useState();
  const [movieError, setMovieError] = useState();
  const [movieStatus, setMovieStatus] = useState('idle');

  const [tvFilter, setTvFilter] = useState('day');
  const [tvData, setTvData] = useState();
  const [tvError, setTvError] = useState();

  const getTrendingMovies = async (filter) => {
    setMovieStatus('loading');
    try {
      const response = await axios.get(
        `http://localhost:3000/media/trending/movie/${filter}`
      );
      console.log(response.data);
      setMovieData(response.data.results);
      setTvError();
      setMovieStatus('idle');
    } catch (e) {
      console.log();
      setMovieError(e.response.data.Msg);
      setMovieData();
      setMovieStatus('idle');
    }
  };

  useEffect(() => {
    getTrendingMovies('day');
  }, []);

  return (
    <div>
      <Search />
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }}>
          {movieData && !movieError && movieStatus === 'idle' ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={25}
              navigation={{ clickable: true }}
              breakpoints={{
                300: {
                  width: 300,
                  slidesPerView: 2,
                },
                600: {
                  width: 600,
                  slidesPerView: 3,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 7,
                },
              }}
            >
              {movieData.map((movie) => (
                <SwiperSlide key={movie.title}>
                  <CardMedia
                    component='img'
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ width: 150, height: 225 }}
                  />
                  <CardContent>
                    <Typography variant='h6' component={'div'}>
                      {movie.title}
                    </Typography>
                  </CardContent>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : !movieData && movieError && movieStatus === 'idle' ? (
            <>error</>
          ) : (
            <>loading</>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
