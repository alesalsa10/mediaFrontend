import { Alert, Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import placeholder from '../../assets/placeholder.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

import 'react-circular-progressbar/dist/styles.css';
import MediaSideline from '../MediaSideline/MediaSideline';
const { default: axios } = require('axios');

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

export default function Overview({
  mediaDetails,
  mediaType,
  videoKey,
  hasTrailer,
  user,
  authData,
}) {
  const [favoriteId, setFavoriteId] = useState('');
  const [userInfo, setUserInfo] = useState(user);
  const [open, setOpen] = useState(false);
  const [cert, setCert] = useState('');
  const [error, setError] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const timeConvert = (n) => {
    if (n === 60) {
      return 1 + 'h';
    } else if (n < 60) {
      return n + 'min';
    } else {
      let hours = Math.floor(n / 60);
      let minutes = n % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  const toggleFavorite = async (mediaType) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/favorites/${mediaType}/${mediaDetails.id}`,
        {},
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.Msg === 'Bookmark created') {
        setFavoriteId(mediaDetails.id);
      } else {
        setUserInfo('');
        setFavoriteId('');
      }
      setError(null);
    } catch (error) {
      console.log(error.response.data);
      //setUser(error.response.data.Msg);
      setError(error.response.data.Msg);
    }
  };

  const selectImg = (media) => {
    if (!media.volumeInfo.imageLinks) {
      return placeholder;
    } else {
      return media.volumeInfo.imageLinks.thumbnail;
    }
  };

  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };

  const getColor = () => {
    if (mediaType === 'tv') {
      if (
        (userInfo &&
          userInfo.favoriteTv &&
          userInfo.favoriteTv.includes(mediaDetails.id.toString())) ||
        favoriteId === mediaDetails.id
      ) {
        return 'red';
      } else {
        return 'text.primary';
      }
    } else if (mediaType === 'movie') {
      if (
        (userInfo &&
          userInfo.favoriteMovies &&
          userInfo.favoriteMovies.includes(mediaDetails.id.toString())) ||
        favoriteId === mediaDetails.id
      ) {
        return 'red';
      } else {
        return 'text.primary';
      }
    }
  };

  useEffect(() => {
    if (mediaType === 'movie') {
      for (const media of mediaDetails.release_dates.results) {
        if (media.iso_3166_1 === 'US') {
          console.log(media);
          setCert(media.release_dates[0].certification);
          break;
        }
      }
    } else if (mediaType === 'tv') {
      for (const media of mediaDetails.content_ratings.results) {
        if (media.iso_3166_1 === 'US') {
          console.log(media);
          setCert(media.rating);
          break;
        }
      }
    }
  }, []);

  const selectDescription = () => {
    if (!mediaDetails.volumeInfo.description) {
      return 'No Description Available';
    } else {
      return mediaDetails.volumeInfo.description;
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, auto)' },
        p: 3,
        gridGap: '1rem',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Box
        component='img'
        src={
          mediaType === 'book'
            ? selectImg(mediaDetails)
            : mediaType === 'people'
            ? !mediaDetails.profile_path
              ? placeholder
              : `${baseImgUrl}${mediaDetails.profile_path}`
            : mediaType === 'movie'
            ? !mediaDetails.poster_path
              ? placeholder
              : `${baseImgUrl}${mediaDetails.poster_path}`
            : !mediaDetails.poster_path
            ? placeholder
            : `${baseImgUrl}/${mediaDetails.poster_path}`
        }
        alt={
          mediaType === 'movie' || mediaType === 'book'
            ? mediaDetails.title
            : mediaDetails.name
        }
        sx={{
          height: 'auto',
          width: {
            xs: 150,
            sm: 300,
          },
          borderRadius: 3,
          justifySelf: { xs: 'center', sm: 'auto' },
        }}
      ></Box>
      <Box>
        <Typography variant='h5' component={'div'} sx={{ py: '0.5rem' }}>
          {mediaType === 'movie'
            ? capitalizeTitle(mediaDetails.title)
            : mediaType === 'book'
            ? capitalizeTitle(mediaDetails.volumeInfo.title)
            : capitalizeTitle(mediaDetails.name)}{' '}
          (
          {mediaType === 'movie'
            ? mediaDetails.release_date.split('-')[0]
            : mediaType === 'tv'
            ? mediaDetails.first_air_date.split('-')[0]
            : mediaDetails.volumeInfo.publishedDate.split('-')[0]}
          )
        </Typography>

        {mediaType === 'book' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: '1rem',
              rowGap: '0.5rem',
            }}
          >
            {mediaDetails.volumeInfo && mediaDetails.volumeInfo.categories ? (
              <Typography variant='body2' sx={{ py: '0.5rem' }}>
                <span>
                  {mediaDetails.volumeInfo.categories.map((genre, index) => (
                    <Fragment key={index}>
                      {`${genre}${
                        index < mediaDetails.volumeInfo.categories.length - 1
                          ? ', '
                          : ''
                      }`}
                      <span> - </span>
                    </Fragment>
                  ))}
                </span>
              </Typography>
            ) : (
              <></>
            )}

            {mediaDetails.volumeInfo.maturityRating ? (
              <>
                <Typography variant='body2' sx={{ py: '0.5rem', pl: '0.2rem' }}>
                  <span>{mediaDetails.volumeInfo.maturityRating} - </span>
                </Typography>
              </>
            ) : (
              <></>
            )}

            {mediaDetails.volumeInfo.authors ? (
              <Typography variant='body2' sx={{ py: '0.5rem' }}>
                <span>
                  {mediaDetails.volumeInfo.authors.map((author, index) => (
                    <Fragment key={index + author}>
                      {`${author}${
                        index < mediaDetails.volumeInfo.authors.length - 1
                          ? ', '
                          : ''
                      }`}
                    </Fragment>
                  ))}
                </span>
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}

        <Typography variant='body2' component={'div'} sx={{ py: '0.5rem' }}>
          {mediaType !== 'book' ? (
            <>
              {cert ? (
                <span
                  style={{
                    // marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                    border: '1px solid black',
                    padding: '0.1rem',
                  }}
                >
                  {cert}
                </span>
              ) : (
                <></>
              )}
              {mediaType === 'movie' ? (
                <>
                  <span>
                    {moment(mediaDetails.release_date).format('MM/DD/YYYY')}
                  </span>
                  <span> - </span>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  {moment(mediaDetails.volumeInfo.publishedDate).format(
                    'MM/DD/YYYY'
                  )}
                </Box>
                <Box sx={{ alignSelf: 'center', ml: 1, alignItems: 'center' }}>
                  {authData.isAuth ? (
                    <FavoriteIcon
                      onClick={() => toggleFavorite('book')}
                      sx={{
                        cursor: 'pointer',
                        color:
                          (userInfo &&
                            userInfo.favoriteBooks &&
                            userInfo.favoriteBooks.includes(
                              mediaDetails.id.toString()
                            )) ||
                          favoriteId === mediaDetails.id.toString()
                            ? 'red'
                            : 'text.primary',
                      }}
                    />
                  ) : (
                    <Link to='/signin'>
                      <FavoriteIcon
                        sx={{
                          cursor: 'pointer',
                          color: 'text.primary',
                        }}
                      />
                    </Link>
                  )}
                </Box>
              </Box>
              {error ? (
                <Alert variant='outlined' severity='error'>
                  {error}
                </Alert>
              ) : (
                <></>
              )}
            </>
          )}

          {mediaType !== 'book' ? (
            <>
              <span>
                {mediaDetails.genres.map((genre, index) => (
                  <Fragment key={index}>
                    {`${genre.name}${
                      index < mediaDetails.genres.length - 1 ? ', ' : ''
                    }`}
                  </Fragment>
                ))}
                <span> - </span>
              </span>
              <span>
                {timeConvert(
                  mediaType === 'movie'
                    ? mediaDetails.runtime
                    : mediaDetails.episode_run_time
                )}
              </span>
            </>
          ) : (
            <></>
          )}
        </Typography>
        {mediaType !== 'book' ? (
          <>
            <Box
              sx={{
                py: '0.5rem',
                display: 'flex',
                flexDirection: 'row',
                //justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  height: 60,
                  width: 60,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <CircularProgressbar
                  value={mediaDetails.vote_average * 10}
                  text={`${mediaDetails.vote_average * 10}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: '#282b29',
                    textColor: '#fff',
                    pathColor:
                      mediaDetails.vote_average * 10 >= 70
                        ? '#21d07a'
                        : mediaDetails.vote_average * 10 > 50 &&
                          mediaDetails.vote_average * 10 < 70
                        ? '#d2d531'
                        : '#d53f31',
                    trailColor: 'transparent',
                    textSize: '30px',
                    width: '60px',
                    height: '60px',
                  })}
                />
              </Box>
              <Box sx={{ alignSelf: 'center', ml: 1 }}>
                {authData.isAuth ? (
                  <FavoriteIcon
                    onClick={
                      mediaType === 'movie'
                        ? () => toggleFavorite('movie')
                        : () => toggleFavorite('tv')
                    }
                    sx={{ color: getColor(), cursor: 'pointer' }}
                  />
                ) : (
                  <Link to='/signin'>
                    {' '}
                    <FavoriteIcon
                      sx={{ cursor: 'pointer', color: 'text.primary' }}
                    />
                  </Link>
                )}
              </Box>

              {hasTrailer ? (
                <Box sx={{ alignSelf: 'center' }}>
                  <Button variant='text' onClick={handleOpen}>
                    Play Trailer
                  </Button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                          xs: '95vw',
                          md: '70vw',
                        },
                        height: {
                          xs: '80vh',
                          md: '55vh',
                        },
                        bgcolor: 'background.paper',
                        //border: '2px solid #000',
                        boxShadow: 24,
                        p: 0,
                      }}
                    >
                      <iframe
                        width='100%'
                        height='100%'
                        src={`https://www.youtube.com/embed/${videoKey}?&autoplay=1`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        title='Embedded youtube'
                      />
                    </Box>
                  </Modal>
                </Box>
              ) : (
                <Box sx={{ alignSelf: 'center', ml: 1 }}>
                  {authData.isAuth ? (
                    <FavoriteIcon
                      onClick={
                        mediaType === 'movie'
                          ? () => toggleFavorite('movie')
                          : () => toggleFavorite('tv')
                      }
                      sx={{ color: getColor(), cursor: 'pointer' }}
                    />
                  ) : (
                    <Link to='/signin'>
                      {' '}
                      <FavoriteIcon
                        sx={{ cursor: 'pointer', color: 'text.primary' }}
                      />
                    </Link>
                  )}
                </Box>
              )}
            </Box>
            {error ? (
              <Alert variant='outlined' severity='error'>
                {error}
              </Alert>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {mediaType === 'movie' && mediaDetails.tagline ? (
          <Typography
            variant={'h6'}
            component={'div'}
            color='text.secondary'
            sx={{
              px: '0.5rem',
              textAlign: 'left',
              flexGrow: 1,
              display: 'grid',
              alignContent: 'end',
              //pb: 3,
            }}
          >
            {mediaDetails.tagline}
          </Typography>
        ) : (
          <></>
        )}
        <Typography
          variant={'h6'}
          component={'div'}
          color='text.primary'
          sx={{
            px: '0.5rem',
            textAlign: 'left',
            flexGrow: 1,
            display: 'grid',
            alignContent: 'end',
            //pb: 3,
          }}
        >
          Overview
        </Typography>
        <Typography
          variant={'body2'}
          component={'div'}
          color='text.primary'
          sx={{
            px: '0.5rem',
            textAlign: 'left',
            flexGrow: 1,
            display: 'grid',
            alignContent: 'end',
            pb: 3,
          }}
        >
          {mediaType !== 'book'
            ? `${mediaDetails.overview}`
            : selectDescription(mediaDetails)}
        </Typography>
        <MediaSideline media={mediaDetails} mediaType={mediaType} />
      </Box>
    </Box>
  );
}
