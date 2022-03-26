import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview/Overview';
import { useParams, useLocation } from 'react-router-dom';
import { Alert, Grid, Skeleton, Box } from '@mui/material';
import TopBillCast from '../../components/TopBillCast/TopBillCast';
import Recommendation from '../../components/Recommendation/Recommendation';
import SeasonsCarousel from '../../components/SeasonsCarousel/SeasonsCarousel';

const { default: axios } = require('axios');

export default function Media() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');
  const [isError, setIsError] = useState(false);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [videoKey, setVideoKey] = useState();

  let params = useParams();
  const location = useLocation();

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

      setData(response.data);
      setError();
      setStatus('idle');
      setIsError(false);
    } catch (error) {
      console.log(error.response.data);
      setIsError(true);
      setStatus('idle');
      setError(error.response.data.Msg);
      setData();
    }
  };

  const getBookById = async () => {
    //http://localhost:3000/book/e3_6vQEACAAJ
    try {
      const response = await axios.get(
        `http://localhost:3000/book/${params.id.split('-')[0]}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setError(error.response.data.Msg);
      setData();
      setStatus('idle');
    }
  };

  const getBookByIsbn = async () => {
    //http://localhost:3000/book/isbn/1101885688
    try {
      const response = await axios.get(
        `http://localhost:3000/book/isbn/${params.id.split('-')[0]}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setError(error.response.data.Msg);
      setData();
      setStatus('idle');
    }
  };


  // const getEpisode = async () => {
  //   //http://localhost:3000/book/isbn/1101885688
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/media/tv/season/${params.id}/${params.seasonNumber}/episode/${params.episodeNumber}`
  //     );
  //     console.log(response.data);
  //     setData(response.data);
  //     setError();
  //     setStatus('idle');
  //     setIsError(false)
  //   } catch (error) {
  //     console.log(error.response.data);
  //     setIsError(true)
  //     setError(error.response.data.Msg);
  //     setData();
  //     setStatus('idle');
  //   }
  // };

  useEffect(() => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaById();
    } else if (location.pathname.includes('isbn')) {
      getBookByIsbn();
    } else if (params.mediaType === 'book') {
      getBookById();
    } else {
      setIsError(true);
      setError('Invalid media type');
    }
    // setStatus('loading');
    // setData();
    // setError();
  }, [params]);
  return (
    <>
      {status === 'loading' && !isError && !data ? (
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
              <Skeleton height={30} width={'50%'} />
              <Skeleton height={25} width={'25%'} sx={{ my: 2 }} />
              <Skeleton height={20} width={'100%'} />{' '}
              <Skeleton height={20} width={'100%'} />{' '}
              <Skeleton height={20} width={'75%'} />
            </Box>
          </Box>
          {params.mediaType !== 'book' ? (
            <>
              <Box sx={{ px: 1, pt: 3 }}>
                <Skeleton width={75} height={30} />
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
                  {[...Array(5).keys()].map((item, index) => (
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
      ) : status === 'idle' && isError && !data ? (
        <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
          {error}
        </Alert>
      ) : (
        <Grid container>
          <Grid item sx={{}}>
            <Overview
              mediaDetails={data.mediaDetails}
              mediaType={params.mediaType}
              hasTrailer={hasTrailer}
              videoKey={videoKey}
            />
          </Grid>
          {params.mediaType !== 'book' ? (
            <Grid container>
              <Grid item xs={12}>
                <TopBillCast
                  cast={data.mediaDetails.credits.cast}
                  mediaType={params.mediaType}
                  mediaId={params.id}
                  
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          {params.mediaType === 'tv' ? (
            <SeasonsCarousel
              seasons={data.mediaDetails.seasons}
              //name={data.mediaDetails.name}
            />
          ) : (
            <></>
          )}
          {params.mediaType !== 'book' ? (
            <Recommendation
              recommendations={data.mediaDetails.recommendations.results}
            />
          ) : (
            <></>
          )}
        </Grid>
      )}
    </>
  );
}
