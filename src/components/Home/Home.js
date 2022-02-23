import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import 'react-circular-progressbar/dist/styles.css';
import styles from './Home.module.css';
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
    getTrendingMovies(movieFilter);
  }, [movieFilter]);

  return (
    <div>
      <Search />
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }}>
          {movieData && !movieError && movieStatus === 'idle' ? (
            <>
              <Grid container pb={2} alignItems='center'>
                <Grid item pr={2}>
                  <Typography variant='h5' component={'div'}>
                    Trending Movies
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl>
                    <Select
                      value={movieFilter}
                      onChange={(event) => setMovieFilter(event.target.value)}
                    >
                      <MenuItem value={'day'}>Today</MenuItem>
                      <MenuItem value={'week'}>This Week</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Swiper
                modules={[Navigation]}
                spaceBetween={25}
                loop={true}
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
                    <div className={styles.cardWrapper}>
                      <CardMedia
                        component='img'
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title}
                        sx={{ width: 150, height: 225 }}
                      />
                      <div className={styles.layer}>
                        <CircularProgressbar
                          value={movie.vote_average * 10}
                          text={`${movie.vote_average * 10}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: '#282b29',
                            textColor: '#fff',
                            pathColor:
                              movie.vote_average * 10 >= 70
                                ? '#21d07a'
                                : movie.vote_average * 10 > 50 &&
                                  movie.vote_average * 10 < 70
                                ? '#d2d531'
                                : '#d53f31',
                            trailColor: 'transparent',
                            textSize: '30px',
                          })}
                        />
                        ;
                      </div>
                    </div>
                    <CardContent
                      sx={{
                        px: 0.5,
                      }}
                    >
                      <Typography
                        variant='body1'
                        component={'div'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant={'body2'}
                        component={'div'}
                        color='text.secondary'
                      >
                        {moment(movie.release_date).format('MMM DD, YYYY')}
                      </Typography>
                    </CardContent>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
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
