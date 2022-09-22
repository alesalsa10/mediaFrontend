import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Grid,
  Skeleton,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import 'react-circular-progressbar/dist/styles.css';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import { DoubleArrowTwoTone } from '@mui/icons-material';

const { default: axios } = require('axios');
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function List({ mediaType, listType }) {
  let params = useParams();

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [state, setState] = useState({
    loading: true,
    response: [],
    error: null,
  });

  useEffect(() => {
    switch (listType) {
      case 'popular':
        if (mediaType === 'movie') {
          document.title = `Popular ${
            mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
          }s`;
        } else if (mediaType === 'people') {
          document.title = 'Popular People';
        } else {
          document.title = `Popular ${mediaType.toUpperCase()} Shows`;
        }
        break;
      case 'top_rated':
        if (mediaType === 'movie') {
          document.title = (
            `Top Rated ${
              mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
            }s`
          );
        } else {
          document.title = `Top Rated ${mediaType.toUpperCase()} Shows`;
        }
        break;
      case 'now_playing':
        document.title = `${
          mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
        }s Now Playing`;
        break;
      case 'upcoming':
        document.title = `Upcoming ${
          mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
        }s`;
        break;
      case 'airing_today':
        document.title = `${mediaType.toUpperCase()} Shows Airing Today`;
        break;
      case 'on_the_air':
        document.title = `Currenly Airing TV Shows`;
        break;
      case 'best_sellers':
        document.title = `Best Selling ${mediaType}s`;
        break;
      default:
        break;
    }
  }, [mediaType, listType]);

  const getMediaLists = async () => {
    if (!showMore) {
      setState((prevState) => ({ ...prevState, loading: true }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
    try {
      const response = await axios.get(
        `${baseURL}media/lists/${mediaType}/${listType}?page=${page}`
      );
      //console.log(response.data);
      setState({
        loading: false,
        response: [...state.response, ...response.data.results],
        error: null,
      });

      setShowMore(false);
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  const getPopularPeople = async () => {
    if (!showMore) {
      setState((prevState) => ({ ...prevState, loading: true }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
    try {
      const response = await axios.get(
        `${baseURL}people/lists/popular?page=${page}`
      );
      //console.log(response.data);
      setState({
        loading: false,
        response: [...state.response, ...response.data.results],
        error: null,
      });
      //}
      setShowMore(false);
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  const getBestSellers = async () => {
    try {
      const response = await axios.get(
        `${baseURL}book/newYorkTimes/bestSellers`
      );
      //console.log(response.data);
      setState({
        loading: false,
        response: response.data,
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
    if (mediaType === 'movie' || mediaType === 'tv') {
      getMediaLists();
    } else if (mediaType === 'book') {
      getBestSellers();
    } else if (mediaType === 'people') {
      getPopularPeople();
    } else {
      setState({
        loading: false,
        response: null,
        error: 'This page does not exist',
      });
    }
  }, [mediaType, page, listType]);

  const handleViewMore = () => {
    setPage((page) => page + 1);
    //setLoc(location);
    setShowMore(true);
  };

  return (
    <Grid
      container
      justifyContent='center'
      px={1}
      py={2}
      sx={{ justifyContent: 'center' }}
      key={`${mediaType}${listType}`}
    >
      <Grid
        item
        xs={12}
        md={8}
        justifyContent='center'
        sx={{ textAlign: 'center', display: 'flex' }}
      >
        {state.loading && !state.error ? (
          <Skeleton
            animation='wave'
            variant='rectangular'
            width={200}
            height={16}
            sx={{ mb: 2, display: 'flex' }}
          />
        ) : (
          <Header params={params} />
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid
          container
          spacing={1}
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'center',
            gap: 2,
            justifyItems: 'center',
            px: 1,
          }}
        >
          {!state.loading && !state.error ? (
            <>
              {params.mediaType === 'movie' ||
              params.mediaType === 'tv' ||
              params.mediaType === 'people' ? (
                <>
                  {state.response.map((media, index) => (
                    <Grid
                      item
                      xs='auto'
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
                      <Box
                        sx={{
                          display: { xs: 'none', sm: 'inherit' },
                        }}
                      >
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
                  {state.response.map((media, index) => (
                    <React.Fragment key={`${media.display_name}${index}`}>
                      <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
                        <Typography
                          variant='h6'
                          component='div'
                          sx={{ textAlign: 'center', color: 'text.primary' }}
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
                            display: { xs: 'initial', sm: 'grid' },
                            justifyContent: 'center',
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
          ) : !state.loading && state.error ? (
            <Grid item xs={12} sx={{ gridColumn: '1/-1' }}>
              <Alert severity='error' variant='outlined' p={2}>
                {state.error}
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
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={180}
                      height={250}
                      sx={{ mb: 2, backgroundColor: 'background.paper' }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'85%'}
                      height={16}
                      sx={{ mb: 2, mx: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'70%'}
                      height={10}
                      sx={{ mb: 2, mx: 1 }}
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
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Box>
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={`100%`}
                        height={100}
                        sx={{ mb: 0, backgroundColor: 'background.paper' }}
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={170}
                        height={16}
                        sx={{ my: 2, px: 1 }}
                      />
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={'80%'}
                        height={10}
                        sx={{ mb: 2, mx: 1 }}
                      />
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={'65%'}
                        height={10}
                        sx={{ mb: 2, mx: 1 }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
      {params.mediaType !== 'book' && !state.error ? (
        <Grid
          item
          xs={12}
          md={8}
          sx={{ justifyContent: 'center', display: 'flex' }}
        >
          {!state.loading ? (
            <Button
              variant='contained'
              sx={{ py: 1, px: 3, lineHeight: 1 }}
              onClick={handleViewMore}
              fullWidth
            >
              {showMore ? (
                <CircularProgress color='inherit' size={'1.2rem'} />
              ) : (
                <span style={{ fontSize: '1.2rem' }}>Load More</span>
              )}
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
