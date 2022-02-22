import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Slider from 'react-slick';
import { Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import styles from './Home.module.css';
const { default: axios } = require('axios');

export default function Home() {
  const [movieFilter, setMovieFilter] = useState('day');
  const [movieData, setMovieData] = useState();
  const [movieError, setMovieError] = useState();
  const [movieStatus, setMovieStatus] = useState('idle');

  const [tvFilter, setTvFilter] = useState('day');
  const [tvData, setTvData] = useState();
  const [tvError, setTvError] = useState();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getTrendingMovies = async (filter) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/media/trending/movie/${filter}`
      );
      console.log(response.data);
      setMovieData(response.data.results);
      setTvError()
    } catch (e) {
      console.log();
      setMovieError(e.response.data.Msg);
      setMovieData()
    }
  };

  useEffect(() => {
    getTrendingMovies('day');
  }, []);

  return (
    <div>
      <Search />
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8} p={8}>
          
        </Grid>
      </Grid>
    </div>
  );
}
