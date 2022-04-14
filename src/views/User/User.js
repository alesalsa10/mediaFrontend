import { Box, Grid, Typography, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import DOMPurify from 'dompurify';

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
    console.log(link);
    navigate(link);
  };

  useEffect(() => {
    getUser();
  }, [params.username]);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>loading</>
        ) : !state.loading && state.error ? (
          <>error</>
        ) : (
          <>
            {state.response.comments.length > 0 ? (
              <>
                {state.response.comments.map((comment) => (
                  <Box sx={{ boxShadow: 4, mb: 1 }} key={comment._id}>
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
                        <Typography variant='body1'>
                          <Link
                            component={RouterLink}
                            to={`/${state.response.username}`}
                            variant='inherit'
                            color='inherit'
                            underline='none'
                            sx={{ ':hover': { color: 'primary.main' } }}
                          >
                            {state.response.username}
                          </Link>
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
                            color='inherit'
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
                          sx={{ color: 'text.secondary', mb: 1}}
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
          </>
        )}
      </Grid>
    </Grid>
  );
}
