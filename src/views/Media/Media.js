import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview/Overview';
import { useParams, useLocation } from 'react-router-dom';
import { Alert, Grid, Skeleton, Box } from '@mui/material';
import TopBillCast from '../../components/TopBillCast/TopBillCast';
import Recommendation from '../../components/Recommendation/Recommendation';
import SeasonsCarousel from '../../components/SeasonsCarousel/SeasonsCarousel';
import Comments from '../../components/Comments/Comments';
import { useSelector } from 'react-redux';

const { default: axios } = require('axios');

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
          `http://localhost:3000/users/${authData.user._id}`
        );
        console.log(response.data);
        setUser(response.data)
      } catch (error) {
        console.log(error);
        setUser(error.response.data.Msg)
      }
    }
  };

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${
          params.id.split('-')[0]
        }`
      );
      console.log(response.data);

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
        `http://localhost:3000/book/${params.id.split('-')[0]}`
      );
      console.log(response.data);
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
        `http://localhost:3000/book/isbn/${params.id.split('-')[0]}`
      );
      console.log(response.data);
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
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '0%',
                mx: 2,
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
                <Box sx={{ px: 1, pt: 3 }}>
                  <Skeleton width={75} height={30} animation='wave' />
                </Box>
                <Box
                  sx={{
                    p: 1,
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
            <Grid item sx={{}}>
              <Overview
                mediaDetails={state.response.mediaDetails}
                mediaType={params.mediaType}
                hasTrailer={hasTrailer}
                videoKey={videoKey}
                user={user}
                authData={authData}
              />
            </Grid>
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
