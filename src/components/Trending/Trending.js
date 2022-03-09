import React, { useEffect, useState } from 'react';
import {
  Alert,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import styles from './Trending.module.css';
import 'react-circular-progressbar/dist/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';

const { default: axios } = require('axios');

export default function Trending({ mediaType }) {
  const [filter, setFilter] = useState('day');
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');

  const getTrendingmedias = async (filter) => {
    setStatus('loading');
    try {
      const response = await axios.get(
        `http://localhost:3000/media/trending/${mediaType}/${filter}`
      );
      console.log(response.data);
      setData(response.data.results);
      setError();
      setStatus('idle');
    } catch (e) {
      console.log();
      setError(e.response.data.Msg);
      setData();
      setStatus('idle');
    }
  };

  useEffect(() => {
    getTrendingmedias(filter);
  }, [filter]);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        <Grid container pb={2} alignItems='center'>
          <Grid item pr={2}>
            <Typography variant='h5' component={'div'}>
              Trending {mediaType === 'movie' ? 'Movies' : 'TV'}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl>
              <Select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value={'day'}>Today</MenuItem>
                <MenuItem value={'week'}>This Week</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {data && !error && status === 'idle' ? (
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
            {data.map((media) => (
              <SwiperSlide
                key={mediaType === 'movie' ? media.title : media.name}
              >
                <Link
                  href={`/${mediaType}/${media.id}`}
                  className={styles.cardWrapper}
                >
                  <CardMedia
                    component='img'
                    src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
                    alt={media.title}
                    sx={{ width: 150, height: 225 }}
                  />
                  <div className={styles.layer}>
                    <CircularProgressbar
                      value={media.vote_average * 10}
                      text={`${media.vote_average * 10}%`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: '#282b29',
                        textColor: '#fff',
                        pathColor:
                          media.vote_average * 10 >= 70
                            ? '#21d07a'
                            : media.vote_average * 10 > 50 &&
                              media.vote_average * 10 < 70
                            ? '#d2d531'
                            : '#d53f31',
                        trailColor: 'transparent',
                        textSize: '30px',
                      })}
                    />
                    ;
                  </div>
                </Link>
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
                    <Link
                      href={`/${mediaType}/${media.id}`}
                      variant='inherit'
                      color='inherit'
                      underline='none'
                      sx={{ ':hover': { color: 'primary.main' } }}
                    >
                      {mediaType === 'movie' ? media.title : media.name}
                    </Link>
                  </Typography>
                  <Typography
                    variant={'body2'}
                    component={'div'}
                    color='text.secondary'
                  >
                    {moment(
                      mediaType === 'movie'
                        ? media.release_date
                        : media.first_air_date
                    ).format('MMM DD, YYYY')}
                  </Typography>
                </CardContent>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : !data && error && status === 'idle' ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error' variant='outlined' p={2}>
              {error}
            </Alert>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
