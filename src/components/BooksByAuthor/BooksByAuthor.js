import {
  Alert,
  Box,
  Grid,
  Skeleton,
  Typography,
  Card as MaterialCard,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import HorizontalCard from '../HorizontalCard/HorizontalCard';

const { default: axios } = require('axios');
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;

export default function BooksByAuthor({ author }) {
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const getBooksByAuthor = async () => {
    try {
      const response = await axios.get(
        `${baseURL}book/byAuthor/${author}`
      );
     // console.log(response.data);
      setState({
        loading: false,
        response: response.data.items || [],
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
    getBooksByAuthor();
  }, [author]);

  return (
    <Grid container justifyContent='center'>
      <Grid container>
        <Grid item sx={{ pt: 3 }}>
          <Typography component={'h2'} variant='h5' sx={{color: 'text.primary'}}>
            More by Author
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} py={1}>
        {state.loading && !state.error ? (
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 0,
            }}
          >
            {[...Array(10).keys()].map((item, index) => (
              <Grid item xs={12} key={index}>
                <MaterialCard
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr',
                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                  }}
                >
                  <Box>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={`100%`}
                      height={100}
                      sx={{ mb: 0 }}
                    />
                  </Box>
                  <Box>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={170}
                      height={16}
                      sx={{ my: 2, ml: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={140}
                      height={10}
                      sx={{ mb: 2, ml: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'90%'}
                      height={10}
                      sx={{ mb: 2, ml: 1 }}
                    />
                  </Box>
                </MaterialCard>
              </Grid>
            ))}
          </Grid>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <Box>
            {state.response.length > 0 ? (
              <>
                {state.response.map((book, index) => (
                  <HorizontalCard
                    key={book + index}
                    selected={'Books'}
                    index={index}
                    movie={book}
                  />
                ))}
              </>
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    No Other books by this author
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
