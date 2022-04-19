import { Alert, Box, Grid, Link, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

export default function FullCast() {
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  let params = useParams();

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${
          params.id.split('-')[0]
        }`
      );
      console.log(response.data);

      //make array of crew separated by department
      //format
      // let object = [
      //   {
      //     department: 'Art',
      //     crew: [

      //     ]
      //   }
      // ]
      let sorted = [];
      for (const [
        index,
        item,
      ] of response.data.mediaDetails.credits.crew.entries()) {
        if (sorted.some((e) => e.department === item.department)) {
          /* contains the element we're looking for */
          let index = sorted.findIndex((e) => e.department === item.department);
          sorted[index].crew.push(item);
        } else {
          sorted.push({
            department: item.department,
            crew: [item],
          });
        }
      }

      // console.log(sorted)
      let sortedObject = { sorted };

      setState({
        loading: false,
        response: { ...response.data, ...sortedObject },
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

  const getSeason = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/tv/${params.id.split('-')[0]}/season/${
          params.seasonNumber
        }`
      );
      console.log(response.data);

      let sorted = [];
      for (const [
        index,
        item,
      ] of response.data.mediaDetails.credits.crew.entries()) {
        if (sorted.some((e) => e.department === item.department)) {
          /* contains the element we're looking for */
          let index = sorted.findIndex((e) => e.department === item.department);
          sorted[index].crew.push(item);
        } else {
          sorted.push({
            department: item.department,
            crew: [item],
          });
        }
      }

      // console.log(sorted)
      let sortedObject = { sorted };
      setState({
        loading: false,
        response: { ...response.data, ...sortedObject },
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

  const getEpisode = async () => {
    //router.get('/tv/:id/season/:seasonNumber/episode/:episodeNumber', mediaControllers.getEpisode);

    try {
      const response = await axios.get(
        `http://localhost:3000/media/tv/${params.id.split('-')[0]}/season/${
          params.seasonNumber
        }/episode/${params.episodeNumber}`
      );
      console.log(response.data);
      let sorted = [];
      for (const [
        index,
        item,
      ] of response.data.mediaDetails.credits.crew.entries()) {
        if (sorted.some((e) => e.department === item.department)) {
          /* contains the element we're looking for */
          let index = sorted.findIndex((e) => e.department === item.department);
          sorted[index].crew.push(item);
        } else {
          sorted.push({
            department: item.department,
            crew: [item],
          });
        }
      }

      // console.log(sorted)
      let sortedObject = { sorted };
      setState({
        loading: false,
        response: { ...response.data, ...sortedObject },
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

  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };

  const getTitle = () => {
    let unformattedTitle = params.id.split('-');
    unformattedTitle = unformattedTitle.slice(1).join(' ');
    return capitalizeTitle(unformattedTitle);
  };

  useEffect(() => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaById();
    } else if (params.seasonNumber && params.episodeNumber) {
      getEpisode();
    } else if (params.seasonNumber) {
      getSeason();
    } else {
      setState({
        loading: false,
        response: null,
        error: 'This page does not exist',
      });
    }
  }, [params]);

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const createLink = () => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      return `/${params.mediaType}/${params.id}`;
    } else if (params.seasonNumber && params.episodeNumber) {
      return `/tv/${params.id}/seasons/${params.seasonNumber}`;
    } else if (params.seasonNumber) {
      return `/tv/${params.id}`;
    }
  };

  const createSubTitle = () => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      return `Back to Main`;
    } else if (params.seasonNumber && params.episodeNumber) {
      return `Back to Season ${params.seasonNumber}`;
    } else if (params.seasonNumber) {
      return `Back to Main`;
    }
  };

  return (
    <>
      {state.loading && !state.error ? (
        <>
          <Grid container>
            <Grid item xs={12} p={0}>
              <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                <Box>
                  <Skeleton width={60} height={150} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pl: 1,
                  }}
                >
                  <Skeleton width={200} height={30} />
                  <Skeleton width={150} height={16} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 1 }}>
                <Skeleton height={24} width={75} />
                {[...Array(20).keys()].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      backgroundColor: 'background.paper',
                      my: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={80}
                        height={80}
                        sx={{ mb: 0, borderRadius: 3 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pl: 1,
                      }}
                    >
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={170}
                        height={16}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={140}
                        height={10}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 1 }}>
                <Skeleton height={24} width={75} />
                {[...Array(20).keys()].map((item, index) => (
                  <Box
                    key={index + index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      backgroundColor: 'background.paper',
                      my: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={80}
                        height={80}
                        sx={{ mb: 0, borderRadius: 3 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pl: 1,
                      }}
                    >
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={170}
                        height={16}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={140}
                        height={10}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </>
      ) : !state.loading && state.error ? (
        <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
          {state.error}
        </Alert>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12} p={0}>
              <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                <Link component={RouterLink} to={createLink()}>
                  <Box
                    component={'img'}
                    src={
                      !state.response.mediaDetails.poster_path
                        ? placeholder
                        : `${baseImgUrl}${state.response.mediaDetails.poster_path}`
                    }
                    sx={{
                      width: 60,
                      backgroundColor: '#a7a7a8',
                      mr: 1,
                      borderRadius: 1,
                    }}
                    alt={state.response.mediaDetails.id}
                  ></Box>
                </Link>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // backgroundColor: 'background.paper',
                    // color: 'text.primary',
                  }}
                >
                  <Link
                    component={RouterLink}
                    to={createLink()}
                    variant='h5'
                    color='inherit'
                    underline='none'
                    sx={{ ':hover': { color: 'text.secondary' } }}
                  >
                    <Typography variant='h6' sx={{ color: 'text.primary' }}>
                      {getTitle()}{' '}
                    </Typography>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={createLink()}
                    variant='h5'
                    color='text.primary'
                    underline='none'
                    sx={{
                      ':hover': { color: 'text.secondary' },
                      width: 'fit-content',
                    }}
                  >
                    <Typography sx={{ display: 'flex', flexDirection: 'row' }}>
                      <ArrowBackIcon />
                      <Typography component={'span'}>
                        {createSubTitle()}
                      </Typography>
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant='h6'
                  sx={{
                    color: 'text.primary',
                  }}
                >
                  Cast ({state.response.mediaDetails.credits.cast.length})
                  {state.response.mediaDetails.credits.cast.length > 0 ? (
                    <>
                      {state.response.mediaDetails.credits.cast.map(
                        (actor, index) => (
                          <Box
                            key={index + actor.name}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              mb: 1,
                              boxShadow: 4,
                            }}
                          >
                            <Link
                              component={RouterLink}
                              to={`/person/${actor.id}-${actor.name
                                .split(' ')
                                .join('-')}`}
                            >
                              <Box
                                component={'img'}
                                src={
                                  !actor.profile_path
                                    ? placeholder
                                    : `${baseImgUrl}${actor.profile_path}`
                                }
                                sx={{
                                  width: 50,
                                  height: '100%',
                                  borderTopLeftRadius: '4px',
                                  borderBottomLeftRadius: '4px',
                                  backgroundColor: '#a7a7a8',
                                }}
                              ></Box>
                            </Link>
                            <Box
                              sx={{
                                justifyContent: 'center',
                                flexDirection: 'column',
                                display: 'flex',
                                pl: 2,
                                backgroundColor: 'background.paper',
                                color: 'text.primary',
                                width: '100%',
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                              }}
                            >
                              <Link
                                component={RouterLink}
                                to={`/person/${actor.id}-${actor.name
                                  .split(' ')
                                  .join('-')}`}
                                variant='inherit'
                                color='inherit'
                                underline='none'
                                sx={{ ':hover': { color: 'primary.main' } }}
                              >
                                <Typography variant='h6'>
                                  {actor.name}
                                </Typography>
                              </Link>
                              <Typography
                                variant='body2'
                                color={'text.secondary'}
                              >
                                {actor.character}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                    </>
                  ) : (
                    <Typography
                      sx={{ textAlign: 'left', m: 1, color: 'text.primary' }}
                    >
                      No cast available
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h6' sx={{ color: 'text.primary' }}>
                  Crew ({state.response.mediaDetails.credits.crew.length})
                  {state.response.mediaDetails.credits.crew.length > 0 ? (
                    <>
                      {state.response.sorted.map((department, index) => (
                        <Fragment key={department.department + index}>
                          <Typography sx={{ fontWeight: 600, mb: 1 }}>
                            {department.department}
                          </Typography>
                          {department.crew.map((actor, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                mb: 1,
                                boxShadow: 4,
                              }}
                            >
                              <Link
                                component={RouterLink}
                                to={`/person/${actor.id}-${actor.name
                                  .split(' ')
                                  .join('-')}`}
                              >
                                <Box
                                  component={'img'}
                                  src={
                                    !actor.profile_path
                                      ? placeholder
                                      : `${baseImgUrl}${actor.profile_path}`
                                  }
                                  sx={{
                                    width: 50,
                                    height: '100%',
                                    borderTopLeftRadius: '4px',
                                    borderBottomLeftRadius: '4px',
                                    backgroundColor: '#a7a7a8',
                                  }}
                                ></Box>
                              </Link>
                              <Box
                                sx={{
                                  justifyContent: 'center',
                                  flexDirection: 'column',
                                  display: 'flex',
                                  pl: 2,
                                  backgroundColor: 'background.paper',
                                  color: 'text.primary',
                                  width: '100%',
                                  borderTopRightRadius: '4px',
                                  borderBottomRightRadius: '4px',
                                }}
                              >
                                <Link
                                  component={RouterLink}
                                  to={`/person/${actor.id}-${actor.name
                                    .split(' ')
                                    .join('-')}`}
                                  variant='inherit'
                                  color='inherit'
                                  underline='none'
                                  sx={{ ':hover': { color: 'primary.main' } }}
                                >
                                  <Typography variant='h6'>
                                    {actor.name}
                                  </Typography>
                                </Link>
                                <Typography
                                  variant='body2'
                                  color={'text.secondary'}
                                >
                                  {actor.job}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <Typography sx={{ textAlign: 'left', m: 1 }}>
                      No crew available
                    </Typography>
                  )}
                </Typography>
                {params.seasonNumber && params.episodeNumber ? (
                  <Typography variant='h6'>
                    Guest stars (
                    {state.response.mediaDetails.credits.guest_stars.length})
                    {state.response.mediaDetails.credits.guest_stars.length >
                    0 ? (
                      <>
                        {state.response.mediaDetails.credits.guest_stars.map(
                          (actor, index) => (
                            <Box
                              key={index + actor.name}
                              sx={{ display: 'flex', flexDirection: 'row' }}
                            >
                              <Link
                                component={RouterLink}
                                to={`/person/${actor.id}-${actor.name
                                  .split(' ')
                                  .join('-')}`}
                              >
                                <Box
                                  component={'img'}
                                  src={
                                    !actor.profile_path
                                      ? placeholder
                                      : `${baseImgUrl}${actor.profile_path}`
                                  }
                                  sx={{
                                    width: 50,
                                    borderRadius: '3px',
                                    backgroundColor: '#a7a7a8',
                                  }}
                                ></Box>
                              </Link>
                              <Box
                                sx={{
                                  justifyContent: 'center',
                                  flexDirection: 'column',
                                  display: 'flex',
                                  pl: 2,
                                }}
                              >
                                <Link
                                  component={RouterLink}
                                  to={`/person/${actor.id}-${actor.name
                                    .split(' ')
                                    .join('-')}`}
                                  variant='inherit'
                                  color='inherit'
                                  underline='none'
                                  sx={{ ':hover': { color: 'primary.main' } }}
                                >
                                  <Typography variant='h6'>
                                    {actor.name}
                                  </Typography>
                                </Link>
                                <Typography
                                  variant='body2'
                                  color={'text.secondary'}
                                >
                                  {actor.character}
                                </Typography>
                              </Box>
                            </Box>
                          )
                        )}
                      </>
                    ) : (
                      <Typography sx={{ textAlign: 'left', m: 1 }}>
                        No guest stars available
                      </Typography>
                    )}
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
