import React, { useState, useEffect } from 'react';
import {
  Alert,
  Grid,
  Skeleton,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import 'react-circular-progressbar/dist/styles.css';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';

const { default: axios } = require('axios');

export default function List() {
  let params = useParams();
  console.log(params)
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const getMediaLists = async () => {
    //setStatus('loading');
    if (!showMore) {
      setStatus('loading');
    } else {
      setStatus('idle');
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/media/lists/${params.mediaType}/${params.listType}?page=${page}`
      );
      console.log(response.data);
      setData([...data, ...response.data.results]);
      setError();
      setStatus('idle');
      setShowMore(false);
    } catch (e) {
      console.log(e);
      setError(e.response.data.Msg);
      setData();
      setStatus('idle');
    }
  };

  const getPopularPeople = async () => {
    if (!showMore) {
      setStatus('loading');
    } else {
      setStatus('idle');
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/people/lists/popular?page=${page}`
      );
      console.log(response.data);
      setData([...data, ...response.data.results]);
      setError();
      setStatus('idle');
      setShowMore(false);
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
    } else if (params.mediaType === 'people') {
      getPopularPeople();
    } else {
      setData();
      setError('Invalid media type');
      setStatus('idle');
    }
    // setStatus('loading');
    // setError('')
    // setData()
  }, [params, page]);

  const handleViewMore = () => {
    setPage((page) => page + 1);
    setShowMore(true);
  };

  return (
    <Grid
      container
      justifyContent='center'
      px={1}
      py={2}
      sx={{ justifyContent: 'center' }}
    >
      <Grid
        item
        xs={12}
        md={10}
        justifyContent='center'
        sx={{ textAlign: 'center', display: 'flex' }}
      >
        {status === 'loading' && !data && !error ? (
          <Skeleton
            animation='wave'
            variant='rectangular'
            width={250}
            height={16}
            sx={{ mb: 2, display: 'flex' }}
          />
        ) : (
          <Header params={params} />
        )}
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid
          container
          spacing={1}
          sx={{
            display: { xs: status === 'loading' ? 'flex' : 'grid' },
            justifyContent: 'center',
            gap: 2,
            gridTemplateColumns: {
              xs: '',
              sm: 'repeat(auto-fill, minmax(200px, 1fr))',
            },
            justifyItems: 'center',
            px: 1,
          }}
        >
          {data && !error && status === 'idle' ? (
            <>
              {params.mediaType === 'movie' ||
              params.mediaType === 'tv' ||
              params.mediaType === 'people' ? (
                <>
                  {data.map((media, index) => (
                    <Grid
                      item
                      xs
                      mb={1}
                      key={
                        params.mediaType === 'movie' ||
                        params.mediaType === 'book'
                          ? media.title
                          : media.name
                      }
                      sx={{
                        display: { xs: 'initial', sm: 'grid' },
                        justifyContent: 'start',
                        width: 'inherit',
                      }}
                    >
                      <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
                        <Card mediaType={params.mediaType} media={media} />
                      </Box>
                      <Box
                        sx={{
                          display: {
                            xs: 'inherit',
                            sm: 'none',
                          },
                        }}
                      >
                        <HorizontalCard
                          selected={
                            params.mediaType === 'movie'
                              ? 'Movies'
                              : params.mediaType === 'tv'
                              ? 'TV Shows'
                              : params.mediaType === 'book'
                              ? 'Books'
                              : 'People'
                          }
                          movie={media}
                          index={index}
                        />
                      </Box>
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {data.map((media, index) => (
                    <React.Fragment key={`${media.display_name}${index}`}>
                      <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
                        <Typography
                          variant='h6'
                          component='div'
                          sx={{ textAlign: 'center' }}
                        >
                          {media.display_name}
                        </Typography>
                      </Grid>
                      {media.books.map((info, i) => (
                        <Grid
                          item
                          xs
                          my={2}
                          key={`${info.title}${i}`}
                          sx={{
                            display: { sx: 'initial', sm: 'grid' },
                            justifyContent: 'start',
                            mt: 0,
                            width: 'inherit',
                          }}
                        >
                          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Card
                              mediaType={params.mediaType}
                              media={info}
                              bestSellers={true}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: {
                                xs: 'inherit',
                                sm: 'none',
                              },
                            }}
                          >
                            <HorizontalCard
                              selected={
                                params.mediaType === 'movie'
                                  ? 'Movies'
                                  : params.mediaType === 'tv'
                                  ? 'TV Shows'
                                  : params.mediaType === 'book'
                                  ? 'Books'
                                  : 'People'
                              }
                              movie={info}
                              index={i}
                              bestSellers={true}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
            </>
          ) : !data && error && status === 'idle' ? (
            <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
              <Alert severity='error' variant='outlined' p={2}>
                {error}
              </Alert>
            </Grid>
          ) : (
            <>
              {[...Array(20).keys()].map((item, index) => (
                <Grid
                  item
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                  key={index}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                    }}
                  >
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={230}
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
                  </Box>
                </Grid>
              ))}
              {[...Array(20).keys()].map((item, index) => (
                <Grid item xs={12} key={index} sx={{ gridColumn: '1/-1' }}>
                  <Box
                    sx={{
                      display: { xs: 'grid', sm: 'none' },
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
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
      {params.mediaType !== 'book' && !error ? (
        <Grid
          item
          xs={12}
          md={10}
          sx={{ justifyContent: 'center', display: 'flex' }}
        >
          <Button
            variant='contained'
            sx={{ py: 1, px: 3, lineHeight: 1 }}
            onClick={handleViewMore}
            fullWidth
          >
            {showMore && status !== 'loading' ? (
              <CircularProgress color='inherit' size={'1.2rem'} />
            ) : (
              <span style={{ fontSize: '1.2rem' }}>Load More</span>
            )}
            {/* <CircularProgress color='inherit' size={'1.2rem'}/> */}
          </Button>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
