import React, { useEffect, useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

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
          <div className={`swiper-container ${mediaType === 'movie' ? 'slider1': 'slider2'}`}>
            <Swiper
              style={{ padding: '1px 0px' }}
              modules={[Navigation]}
              spaceBetween={15}
              loop={true}
              loopedSlides={1}
              slidesPerView='auto'
              navigation
            >
              {data.map((media, index) => (
                <SwiperSlide
                  key={
                    mediaType === 'movie' || mediaType === 'book'
                      ? media.title + index
                      : media.name + index
                  }
                  style={{
                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                    width: 'fit-content',
                    height: 'auto',
                    borderRadius: '3px',
                  }}
                >
                  <Card mediaType={mediaType} media={media} type='carousel' />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : !data && error && status === 'idle' ? (
          <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
            <Alert severity='error' variant='outlined' p={2}>
              {error}
            </Alert>
          </Grid>
        ) : (
          <Swiper
            style={{ padding: '1px 0px' }}
            spaceBetween={25}
            slidesPerView='auto'
          >
            <>
              {[...Array(5).keys()].map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                    width: 'fit-content',
                    height: 'auto',
                  }}
                >
                  <React.Fragment key={index}>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={250}
                      height={300}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={170}
                      height={16}
                      sx={{ mb: 2, ml: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={140}
                      height={10}
                      sx={{ mb: 2, ml: 1 }}
                    />
                  </React.Fragment>
                </SwiperSlide>
              ))}
            </>
          </Swiper>
        )}
      </Grid>
    </Grid>
  );
}
