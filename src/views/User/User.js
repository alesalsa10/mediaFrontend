import { Box, Grid, Typography, Link, Alert, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import DOMPurify from 'dompurify';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';
const { default: axios } = require('axios');

export default function User() {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    response: null,
    loading: true,
    error: null,
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${params.username}`
      );
      console.log(response.data);
      setState({
        response: response.data,
        loading: false,
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

  const getMediaLink = (comment) => {
    if (comment.parentMovie) {
      return `/movie/${comment.parentMovie._id}-${comment.parentMovie.name
        .split(' ')
        .join('-')}`;
    } else if (comment.parentTv) {
      return `/tv/${comment.parentTv._id}-${comment.parentTv.name
        .split(' ')
        .join('-')}`;
    } else if (comment.parentBook) {
      return `/book/${comment.parentBook._id}-${comment.parentBook.name
        .split(' ')
        .join('-')}`;
    } else if (comment.parentSeason) {
      return `/tv/${comment.parentSeason.media}-${comment.parentSeason.mediaName
        .split(' ')
        .join('-')}/seasons/${comment.parentSeason.seasonNumber}`;
    } else if (comment.parentEpisode) {
      return `/tv/${
        comment.parentEpisode.mediaId
      }-${comment.parentEpisode.mediaName.split(' ').join('-')}/seasons/${
        comment.parentEpisode.seasonNumber
      }/episodes/${comment.parentEpisode.episodeNumber}`;
    } else {
      return '/';
    }
  };

  const getMediaText = (comment) => {
    if (comment.parentMovie) {
      return `${comment.parentMovie.name}`;
    } else if (comment.parentTv) {
      return `${comment.parentTv.name}`;
    } else if (comment.parentBook) {
      return `${comment.parentBook.name}`;
    } else if (comment.parentSeason) {
      return `
          ${comment.parentSeason.mediaName}, Season ${comment.parentSeason.seasonNumber}`;
    } else if (comment.parentEpisode) {
      return `${comment.parentEpisode.mediaName}, Season ${comment.parentEpisode.seasonNumber}, Episode ${comment.parentEpisode.episodeNumber}`;
    } else {
      return 'No available';
    }
  };

  const sanitizedData = (text) => ({
    __html: DOMPurify.sanitize(text),
  });

  const goToComment = (comment) => {
    let link = `${getMediaLink(comment)}#${comment._id}`;
    navigate(link);
  };

  useEffect(() => {
    getUser();
    // setState({
    //   response: null,
    //   loading: true,
    //   error: null,
    // });
  }, [params.username]);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row-reverse',
              },
              gap: 1,
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
              <Skeleton
                width={150}
                height={20}
                animation='wave'
                variant='text'
                sx={{ mb: 1 }}
              />
              <Box
                sx={{
                  boxShadow: 4,
                  p: 0.5,
                  mb: 2,
                  height: 'fit-content',
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Skeleton
                    variant='circular'
                    height={30}
                    width={30}
                    animation='wave'
                  />
                  <Skeleton
                    varaint='text'
                    height={20}
                    width={'70%'}
                    animation='wave'
                  />
                </Box>
                <Box
                  sx={{
                    pt: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Box sx={{ width: '50%' }}>
                    <Skeleton
                      varaint='text'
                      height={20}
                      width={'95%'}
                      animation='wave'
                    />
                    <Skeleton
                      varaint='text'
                      height={20}
                      width={'85%'}
                      animation='wave'
                    />
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Skeleton
                      varaint='text'
                      height={20}
                      width={'95%'}
                      animation='wave'
                    />
                    <Skeleton
                      varaint='text'
                      height={20}
                      width={'85%'}
                      animation='wave'
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    pt: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Skeleton
                    varaint='text'
                    height={20}
                    width={'85%'}
                    animation='wave'
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '100%',
                  //md: '60%',
                },
              }}
            >
              <Skeleton
                width={150}
                height={20}
                animation='wave'
                sx={{ mb: 1 }}
              />
              {[...Array(15).keys()].map((item, index) => (
                <Box sx={{ boxShadow: 4, mb: 1, p: 1 }} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        md: 'row',
                      },
                      flexWrap: 'wrap',
                      alignItems: {
                        xs: 'start',
                        md: 'center',
                      },
                      py: 1,
                      rowGap: '0.5rem',
                      columnGap: '0.2rem',
                      mx: 1,
                      borderBottom: '1px solid gray',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        rowGap: '0.5rem',
                        columnGap: '0.2rem',
                        width: '40%',
                      }}
                    >
                      <Skeleton
                        animation='wave'
                        varaint='text'
                        height={20}
                        width={'50%'}
                      />
                      <Skeleton
                        animation='wave'
                        varaint='text'
                        height={20}
                        width={'40%'}
                      />
                    </Box>
                    <Box sx={{ width: '55%' }}>
                      <Skeleton
                        animation='wave'
                        varaint='text'
                        height={20}
                        width={'70%'}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      px: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Skeleton
                        animation='wave'
                        varaint='text'
                        height={20}
                        width={100}
                      />
                    </Box>
                    <Skeleton
                      animation='wave'
                      varaint='text'
                      height={20}
                      width={'90%'}
                    />
                    <Skeleton
                      animation='wave'
                      varaint='text'
                      height={20}
                      width={'75%'}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row-reverse',
              },
              gap: 1,
              color: 'text.primary',
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>
              <Typography variant='h5'>Overview</Typography>
              <Box
                sx={{
                  boxShadow: 4,
                  p: 2,
                  mb: 2,
                  height: 'fit-content',
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  {!state.response.profilePicture ? (
                    <AccountCircleRoundedIcon fontSize='large' />
                  ) : (
                    <Box
                      component={'img'}
                      src={state.response.profilePicture}
                    ></Box>
                  )}
                  <Typography variant='h6'>
                    {state.response.username}
                  </Typography>
                </Box>
                <Box
                  sx={{ pt: 1, display: 'flex', flexDirection: 'row', gap: 1 }}
                >
                  <Box>
                    <Typography variant='body1'>Name</Typography>
                    <Typography variant='body1'>
                      {state.response.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body1'>Created On</Typography>
                    <Typography variant='body1'>
                      {moment(state.response.createdAt).format('MMMM Do YYYY')}
                    </Typography>
                  </Box>
                </Box>
                <>
                  {state.response.isVerified ? (
                    <Box
                      sx={{
                        pt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <VerifiedUserIcon fontSize='medium' />
                      <Typography variant='body2'>Verified</Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        pt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <CancelIcon fontSize='medium' />
                      <Typography variant='body2'>Not Verified</Typography>
                    </Box>
                  )}
                </>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '100%',
                  //md: '60%',
                },
              }}
            >
              <Typography variant='h5'>Comments</Typography>
              {state.response.comments.length > 0 ? (
                <>
                  {state.response.comments.map((comment) => (
                    <Box
                      sx={{
                        boxShadow: 4,
                        mb: 1,
                        p: 1,
                        backgroundColor: 'background.paper',
                      }}
                      key={comment._id}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: {
                            xs: 'column',
                            md: 'row',
                          },
                          flexWrap: 'wrap',
                          alignItems: {
                            xs: 'start',
                            md: 'center',
                          },
                          py: 1,
                          rowGap: '0.5rem',
                          columnGap: '0.2rem',
                          mx: 1,
                          borderBottom: '1px solid gray',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            rowGap: '0.5rem',
                            columnGap: '0.2rem',
                          }}
                        >
                          <Typography
                            variant='body1'
                            sx={{ color: 'text.primary' }}
                          >
                            {state.response.username}
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.secondary' }}
                          >
                            commented on
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant='body1'>
                            <Link
                              component={RouterLink}
                              to={getMediaLink(comment)}
                              variant='inherit'
                              color='text.primary'
                              underline='none'
                              sx={{ ':hover': { color: 'primary.main' } }}
                            >
                              {getMediaText(comment)}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          px: 1,
                          cursor: 'pointer',
                          ':hover': {
                            borderColor: 'primary.main',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                          },
                        }}
                        onClick={() => goToComment(comment)}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.secondary', mb: 1 }}
                          >
                            {comment.editedAt ? (
                              <>Edited {moment(comment.editedAt).fromNow()}</>
                            ) : (
                              moment(comment.datePosted).fromNow()
                            )}
                            {}
                          </Typography>
                        </Box>
                        <div
                          style={{ marginBottom: '0.2rem' }}
                          dangerouslySetInnerHTML={sanitizedData(comment.text)}
                        />
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                <>This user has no comments</>
              )}
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
