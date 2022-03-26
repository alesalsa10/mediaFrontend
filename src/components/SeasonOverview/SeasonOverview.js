import { Box, Typography } from '@mui/material';
import React from 'react';
import placeholder from '../../assets/placeholder.png';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function SeasonOverview({ mediaDetails, hasTrailer, videoKey }) {
  const params = useParams();
  console.log(params);
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  const capitalizeTitle = () => {
    let title = params.id.split('-');
    title = title.slice(1).join(' ');
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, auto)' },
        p: 3,
        gridGap: '1rem',
        alignItems: 'center',
      }}
    >
      <Box
        component='img'
        src={
          !mediaDetails.poster_path
            ? placeholder
            : `${baseImgUrl}/${mediaDetails.poster_path}`
        }
        alt={mediaDetails.name}
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
          {capitalizeTitle()}
        </Typography>

        {/* {mediaType !== 'book' ? (
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
        )} */}
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
        {/* <Typography
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
          {mediaDetails.overview || 'No overview available'}
        </Typography> */}
        {/* {mediaType !== 'book' ? (
          <MediaSideline media={mediaDetails} mediaType={mediaType} />
        ) : (
          <></>
        )} */}
      </Box>
    </Box>
  );
}
