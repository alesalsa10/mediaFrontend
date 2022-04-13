import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Alert, Grid, Skeleton } from '@mui/material';
import SeasonOverview from '../../components/SeasonOverview/SeasonOverview';
import TopBillCast from '../../components/TopBillCast/TopBillCast';
import EpisodesCarousel from '../../components/EpisodesCarousel/EpisodesCarousel';
import Comments from '../../components/Comments/Comments';

export default function Season({seasonNumber, episodeNumber, id, mediaType, params}) {
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const [hasTrailer, setHasTrailer] = useState(false);
  const [videoKey, setVideoKey] = useState();

  const getSeason = async () => {
    //http://localhost:3000/media/tv/season/1420/3
    try {
      const response = await axios.get(
        `http://localhost:3000/media/tv/${id.split('-')[0]}/season/${
          seasonNumber
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
      console.log(error.response.data.Msg);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  const getEpisode = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/tv/${id.split('-')[0]}/season/${
          seasonNumber
        }/episode/${episodeNumber}`
      );
      console.log(response.data);

      setHasTrailer(false);

      setState({
        loading: false,
        response: response.data,
        error: null,
      });
    } catch (error) {
      console.log(error.response.data.Msg);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    if (seasonNumber && episodeNumber) {
      getEpisode();
    } else if (seasonNumber) {
      getSeason();
    } else {
      setState({
        loading: false,
        response: null,
        error: 'This page does not exist',
      });
    }
  }, [seasonNumber, episodeNumber, id]);
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
                  animation='wave'
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
            {mediaType !== 'book' ? (
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
            <Grid item>
              <SeasonOverview
                mediaDetails={state.response.mediaDetails}
                hasTrailer={hasTrailer}
                videoKey={videoKey}
              />
            </Grid>
            {seasonNumber &&
            !episodeNumber &&
            state.response.mediaDetails.credits.cast.length > 0 ? (
              <Grid container>
                <Grid item xs={12}>
                  <TopBillCast
                    cast={state.response.mediaDetails.credits.cast}
                    mediaType={mediaType}
                    mediaId={id}
                    params={params}
                  />
                </Grid>
              </Grid>
            ) : seasonNumber &&
              episodeNumber &&
              state.response.mediaDetails.credits.cast.length > 0 ? (
              <Grid container>
                <Grid item xs={12}>
                  <TopBillCast
                    cast={state.response.mediaDetails.credits.cast}
                    mediaType={mediaType}
                    mediaId={id}
                    params={params}
                  />
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {seasonNumber &&
            !episodeNumber &&
            state.response.mediaDetails.episodes.length > 0 &&
            seasonNumber ? (
              <Grid container>
                <Grid item xs={12}>
                  <EpisodesCarousel
                    episodes={state.response.mediaDetails.episodes}
                  />
                </Grid>
              </Grid>
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
