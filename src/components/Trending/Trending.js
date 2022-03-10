import React, { useEffect, useState } from 'react';
import {
  Alert,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import styles from './Trending.module.css';
import 'react-circular-progressbar/dist/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from '../Card/Card';

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
                key={
                  mediaType === 'movie' || mediaType === 'book'
                    ? media.title
                    : media.name
                }
              >
                <Card mediaType={mediaType} media={media} type='slide' />
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
