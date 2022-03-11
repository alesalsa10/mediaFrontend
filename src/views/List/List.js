import React, { useState, useEffect } from 'react';
import {
  Alert,
  Grid,
  Card as MaterialCard,
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import 'react-circular-progressbar/dist/styles.css';
import Card from '../../components/Card/Card';

const { default: axios } = require('axios');

export default function List() {
  let params = useParams();
  console.log(params);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');

  const getMediaLists = async () => {
    setStatus('loading');
    try {
      const response = await axios.get(
        `http://localhost:3000/media/lists/${params.mediaType}/${params.listType}`
      );
      console.log(response.data);
      setData(response.data.results);
      setError();
      setStatus('idle');
    } catch (e) {
      console.log(e);
      setError(e.response.data.Msg);
      setData();
      setStatus('idle');
    }
  };

  const getBestSellers = async () => {
    setStatus('loading');
    try {
      const response = await axios.get(
        `http://localhost:3000/book/newYorkTimes/bestSellers`
      );
      console.log(response.data);
      setData(response.data);
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
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaLists();
    } else if (params.mediaType === 'book') {
      getBestSellers();
    } else {
      //set error saying invalid media type
    }
  }, [params]);

  return (
    <Grid container justifyContent='center' px={1} py={2}>
      <Grid item xs={12} md={8}>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 200px)',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {data && !error && status === 'idle' ? (
            <>
              {data.map((media) => (
                <Grid
                  item
                  xs
                  my={2}
                  key={
                    params.mediaType === 'movie' || params.mediaType === 'book'
                      ? media.title
                      : media.name
                  }
                  sx={{ display: 'grid', justifyContent: 'center' }}
                >
                  <MaterialCard
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                    }}
                  >
                    <Card
                      mediaType={params.mediaType}
                      media={media}
                      type='lists'
                    />
                  </MaterialCard>
                </Grid>
              ))}
            </>
          ) : !data && error && status === 'idle' ? (
            <Grid
              item
              xs={12}
              sx={{ gridColumn: '1/-1' }}
            >
              <Alert severity='error' variant='outlined' p={2}>
                {error}
              </Alert>
            </Grid>
          ) : (
            <>
              {[...Array(20).keys()].map((item, index) => (
                <Grid item sx={{ display: 'grid', justifyContent: 'center' }}>
                  <MaterialCard
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                    }}
                    key={index}
                  >
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
                  </MaterialCard>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
