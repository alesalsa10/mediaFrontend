import React, { useState, useEffect } from 'react';
import {
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Card as MaterialCard,
} from '@mui/material';
import { Box } from '@mui/system';
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
      console.log();
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
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaLists();
    } else if (params.mediaType === 'book') {
      getBestSellers();
    } else {
      //set error saying invalid media type
    }
  }, [params]);

  return (
    <Grid>
      {data && !error && status === 'idle' ? (
        <>
          {data.map((media) => (
            <MaterialCard
              key={
                params.mediaType === 'movie' || params.mediaType === 'book'
                  ? media.title
                  : media.name
              }
            >
              <Card mediaType={params.mediaType} media={media} type='lists' />
            </MaterialCard>
          ))}
        </>
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
  );
}
