import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material';

import 'react-circular-progressbar/dist/styles.css';

import Card from '../Card/Card';

const { default: axios } = require('axios');

export default function Trending({ mediaType }) {
  const [filter, setFilter] = useState('day');

  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const getTrendingmedias = async (filter) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/media/trending/${mediaType}/${filter}`
      );
      //console.log(response.data);
      setState({
        loading: false,
        response: response.data.results,
        error: null,
      });
    } catch (error) {
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    getTrendingmedias(filter);
    //setState({loading: true, error: null, response: null})
  }, [filter]);

  return (
    <Grid container justifyContent='center'>
      <Grid
        item
        xs={12}
        md={8}
        p={8}
        px={{ xs: 3, md: 0 }}
        py={1}
        sx={{ bgColor: 'background.primary', color: 'text.primary' }}
      >
        <Grid container pb={2} alignItems='center'>
          <Grid item pr={2}>
            <Typography variant='h5' component={'div'}>
              Trending {mediaType === 'movie' ? 'Movies' : 'TV'}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl color={'primary'} size='small'>
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

        {state.loading && !state.error ? (
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
        ) : !state.loading && state.error ? (
          <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
            <Alert severity='error' variant='outlined' p={2}>
              {state.error}
            </Alert>
          </Grid>
        ) : (
          <Box
            className={'scrollList'}
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'scroll',
              gap: '10px',
            }}
          >
            {state.response.map((media, index) => (
              <Card
                mediaType={mediaType}
                media={media}
                type='carousel'
                key={index}
              />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
