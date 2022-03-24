import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import placeholder from '../../assets/placeholder.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import FavoriteIcon from '@mui/icons-material/Favorite';

import 'react-circular-progressbar/dist/styles.css';

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

export default function Overview({
  mediaDetails,
  mediaType,
  videoKey,
  hasTrailer,
}) {
  console.log(mediaType)
  const [open, setOpen] = useState(false);
  const [cert, setCert] = useState('');
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
        gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, auto)'},
        p: 3,
        gridGap: '1rem',
        alignItems: 'center'
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
          justifySelf: {xs: 'center', sm: 'auto'}
        }}
      ></Box>
      <Box>
        <Typography
          variant='h5'
          component={'div'}
          sx={{ py: '0.5rem' }}
        >
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

        <Typography variant='body2' component={'div'} sx={{py: '0.5rem'}}>
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
            <span>
              {moment(mediaDetails.volumeInfo.publishedDate).format(
                'MM/DD/YYYY'
              )}
            </span>
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
            <Box sx={{ alignSelf: 'center' }}>
              <FavoriteIcon />
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
              <Box sx={{ alignSelf: 'center' }}>
                <FavoriteIcon />
              </Box>
            )}
          </Box>
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
      </Box>
    </Box>
  );
}
