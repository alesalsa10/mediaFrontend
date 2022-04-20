import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview/Overview';
import { useParams, useLocation } from 'react-router-dom';
import {
  Alert,
  Grid,
  Skeleton,
  Box,
  Typography,
  Link,
  Card as MaterialCard,
} from '@mui/material';
import TopBillCast from '../../components/TopBillCast/TopBillCast';
import Recommendation from '../../components/Recommendation/Recommendation';
import SeasonsCarousel from '../../components/SeasonsCarousel/SeasonsCarousel';
import Comments from '../../components/Comments/Comments';
import { useSelector } from 'react-redux';
import BooksByAuthor from '../../components/BooksByAuthor/BooksByAuthor';
import amazonLogo from '../../assets/amazonLogo.png';

const { default: axios } = require('axios');
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;
export default function Media() {
  const authData = useSelector((state) => state.auth);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });
  const [user, setUser] = useState(null);

  let params = useParams();
  const location = useLocation();

  const getUser = async () => {
    if (authData.isAuth) {
      try {
        const response = await axios.get(
          `${baseURL}users/${authData.user.username}`
        );
        //console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(error.response.data.Msg);
      }
    }
  };

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `${baseURL}media/getById/${params.mediaType}/${params.id.split('-')[0]}`
      );
      //console.log(response.data);
      document.title =
        response.data.mediaDetails.title || response.data.mediaDetails.name;
      if (
        response.data.mediaDetails.videos &&
        response.data.mediaDetails.videos.results.length > 0
      ) {
        for (const media of response.data.mediaDetails.videos.results) {
          if (
            media.type === 'Trailer' &&
            media.site === 'YouTube' &&
            media.official
          ) {
            setHasTrailer(true);
            setVideoKey(media.key);
            break;
          }
        }
      } else {
        setHasTrailer(false);
      }

      setState({
        loading: false,
        response: response.data,
        error: null,
      });
    } catch (error) {
      console.log(error.response.data);
      document.title = 'Something went wrong';
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  const getBookById = async () => {
    //http://localhost:3000/book/e3_6vQEACAAJ
    try {
      const response = await axios.get(
        `${baseURL}book/${params.id.split('-')[0]}`
      );
      //console.log(response.data);
      document.title = response.data.mediaDetails.volumeInfo.title;

      setState({
        loading: false,
        response: response.data,
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

  const getBookByIsbn = async () => {
    //http://localhost:3000/book/isbn/1101885688
    try {
      const response = await axios.get(
        `${baseURL}book/isbn/${params.id.split('-')[0]}`
      );
      //console.log(response.data);
      document.title = response.data.mediaDetails.volumeInfo.title;

      setState({
        loading: false,
        response: response.data,
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
    getUser();
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaById();
    } else if (location.pathname.includes('isbn')) {
      getBookByIsbn();
    } else if (params.mediaType === 'book') {
      getBookById();
    } else {
      setState({
        loading: false,
        response: null,
        error: 'This page does not exist',
      });
    }
  }, [params]);
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '0%',
                backgroundColor: 'background.paper',
                p: 2,
              }}
            >
              <Box sx={{ alignSelf: { xs: 'center', sm: '' } }}>
                <Skeleton
                  sx={{
                    width: { xs: 150, sm: 200 },
                    height: { xs: 250, sm: 350 },
                    transform: 'scale(1,1)',
                    my: 1,
                  }}
                  animation='wave'
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: { xs: 0, sm: 2 },
                  width: '100%',
                }}
              >
                <Skeleton height={30} width={'50%'} animation='wave' />
                <Skeleton
                  height={25}
                  width={'25%'}
                  sx={{ my: 2 }}
                  animation='wave'
                />
                <Skeleton height={20} width={'100%'} animation='wave' />{' '}
                <Skeleton height={20} width={'100%'} animation='wave' />{' '}
                <Skeleton height={20} width={'75%'} animation='wave' />
              </Box>
            </Box>
            {params.mediaType !== 'book' ? (
              <>
                <Box sx={{ pt: 3 }}>
                  <Skeleton width={75} height={30} animation='wave' />
                </Box>
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    gap: '10px',
                  }}
                >
                  <>
                    {[...Array(15).keys()].map((item, index) => (
                      <Box
                        key={index}
                        sx={{ backgroundColor: 'background.paper' }}
                      >
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
                    ))}
                  </>
                </Box>
              </>
            ) : (
              <></>
            )}
            {params.mediaType === 'book' ? (
              <>
                <Box sx={{ backgroundColor: 'background.paper', my: 4, p: 2 }}>
                  <Skeleton
                    width={150}
                    height={35}
                    my={1}
                    mx={1}
                    animation='wave'
                  />
                  <Skeleton
                    width={200}
                    height={25}
                    my={1}
                    mx={1}
                    animation='wave'
                  />
                </Box>
                <Box>
                  <Skeleton width={150} height={35} sx={{ mb: 1 }} />
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
                            backgroundColor: 'background.paper',
                          }}
                        >
                          <Box>
                            <Skeleton
                              animation='wave'
                              variant='rectangular'
                              width={`100%`}
                              height={100}
                              sx={{
                                mb: 0,
                                backgroundColor: 'background.paper',
                              }}
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
                </Box>
              </>
            ) : (
              <></>
            )}
          </>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <Grid container>
            <Grid item>
              <Overview
                mediaDetails={state.response.mediaDetails}
                mediaType={params.mediaType}
                hasTrailer={hasTrailer}
                videoKey={videoKey}
                user={user}
                authData={authData}
              />
            </Grid>
            {params.mediaType === 'book' &&
            state.response.mediaDetails.volumeInfo.industryIdentifiers ? (
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      boxShadow: 4,
                      p: 2,
                      my: 2,
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='h6'>Buy Print</Typography>
                    <Link
                      href={`http://www.amazon.com/gp/search?index=books&linkCode=qs&keywords=${state.response.mediaDetails.volumeInfo.industryIdentifiers[0].identifier}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='inherit'
                      color='inherit'
                      underline='none'
                      sx={{
                        ':hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '1rem',
                          mt: '1rem',
                        }}
                      >
                        <Box
                          component={'img'}
                          src={amazonLogo}
                          alt='amazon logo'
                        />
                        <Typography variant={'body1'}>Buy on amazon</Typography>
                      </Box>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {params.mediaType === 'book' &&
            state.response.mediaDetails.volumeInfo.authors ? (
              <Grid container>
                <Grid item xs={12}>
                  <BooksByAuthor
                    author={state.response.mediaDetails.volumeInfo.authors.join(
                      ' '
                    )}
                  />
                </Grid>
              </Grid>
            ) : params.mediaType === 'book' &&
              !state.response.mediaDetails.volumeInfo.authors ? (
              <Grid container py={2}>
                <Grid item xs={12} sx={{ color: 'text.primary' }}>
                  <Typography variant='h6'>
                    No Other books by this author found
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            {params.mediaType !== 'book' ? (
              <Grid container>
                <Grid item xs={12}>
                  <TopBillCast
                    cast={state.response.mediaDetails.credits.cast}
                    mediaType={params.mediaType}
                    mediaId={params.id}
                    params={params}
                  />
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {params.mediaType === 'tv' ? (
              <SeasonsCarousel seasons={state.response.mediaDetails.seasons} />
            ) : (
              <></>
            )}
            {params.mediaType !== 'book' ? (
              <Recommendation
                recommendations={
                  state.response.mediaDetails.recommendations.results
                }
              />
            ) : (
              <></>
            )}
            <Comments
              id={state.response.mediaDetails.id}
              count={state.response.foundMedia.comments.length}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
