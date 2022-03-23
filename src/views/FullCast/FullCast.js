import { Alert, Box, Grid, Link, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FullCast() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');

  let params = useParams();

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${params.id}`
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

      setData({ ...response.data, ...sortedObject });
      console.log(data);
      setError();
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setError(error.data.response.Msg);
      setData();
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaById();
    } else {
      setError('Invalid media type');
    }
    // setStatus('idle');
    // setData();
    // setError('something went wrong')
  }, [params]);

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <>
      {status === 'loading' && !error && !data ? (
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
                      py: 1,
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
                      py: 1,
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
      ) : status === 'idle' && error && !data ? (
        <Alert severity='error' variant='outlined' sx={{p:2, m:2}}>
          {error}
        </Alert>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12} p={0}>
              <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                <Link href={`/${params.mediaType}/${params.id}`}>
                  <Box
                    component={'img'}
                    src={
                      !data.mediaDetails.poster_path
                        ? placeholder
                        : `${baseImgUrl}${data.mediaDetails.poster_path}`
                    }
                    sx={{
                      width: 60,
                      pr: 2,
                    }}
                    alt={data.mediaDetails.id}
                  ></Box>
                </Link>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Link
                    href={`/${params.mediaType}/${params.id}`}
                    variant='h5'
                    color='inherit'
                    underline='none'
                    sx={{ ':hover': { color: 'text.secondary' } }}
                  >
                    <Typography variant='h6'>
                      {params.mediaType === 'movie'
                        ? data.mediaDetails.title
                        : data.mediaDetails.name}{' '}
                      (
                      {params.mediaType === 'movie'
                        ? data.mediaDetails.release_date.split('-')[0]
                        : data.mediaDetails.first_air_date.split('-')[0]}
                      )
                    </Typography>
                  </Link>
                  <Link
                    href={`/${params.mediaType}/${params.id}`}
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
                      <Typography component={'span'}>Back to main</Typography>
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h6'>
                  Cast ({data.mediaDetails.credits.cast.length})
                  {data.mediaDetails.credits.cast.map((actor, index) => (
                    <Box
                      key={index + actor.name}
                      sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                      <Link href={`/people/${actor.id}`}>
                        <Box
                          component={'img'}
                          src={
                            !actor.profile_path
                              ? placeholder
                              : `${baseImgUrl}${actor.profile_path}`
                          }
                          sx={{ width: 50, borderRadius: '3px' }}
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
                          href={`/people/${actor.id}`}
                          variant='inherit'
                          color='inherit'
                          underline='none'
                          sx={{ ':hover': { color: 'primary.main' } }}
                        >
                          <Typography variant='h6'>{actor.name}</Typography>
                        </Link>
                        <Typography variant='body2' color={'text.secondary'}>
                          {actor.character}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h6'>
                  Crew ({data.mediaDetails.credits.crew.length})
                  {data.sorted.map((department, index) => (
                    <Fragment key={department.department + index}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {department.department}
                      </Typography>
                      {department.crew.map((actor, index) => (
                        <Box
                          key={index}
                          sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <Link href={`/people/${actor.id}`}>
                            <Box
                              component={'img'}
                              src={
                                !actor.profile_path
                                  ? placeholder
                                  : `${baseImgUrl}${actor.profile_path}`
                              }
                              sx={{ width: 50, borderRadius: '3px' }}
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
                              href={`/people/${actor.id}`}
                              variant='inherit'
                              color='inherit'
                              underline='none'
                              sx={{ ':hover': { color: 'primary.main' } }}
                            >
                              <Typography variant='h6'>{actor.name}</Typography>
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
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
