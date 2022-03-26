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
        <Typography variant='h6' component={'div'} sx={{ py: '0.5rem' }}>
          {mediaDetails.name} (
          {moment(mediaDetails.air_date).format('MM/DD/YYYY') || 'No air date available'})
        </Typography>
        <Typography
          variant={'h6'}
          component={'div'}
          color='text.primary'
          sx={{
            //px: '0.5rem',
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
            //px: '0.5rem',
            textAlign: 'left',
            flexGrow: 1,
            display: 'grid',
            alignContent: 'end',
            pb: 3,
          }}
        >
          {mediaDetails.overview || 'No overview available'}
        </Typography>
        {/* {mediaType !== 'book' ? (
          <MediaSideline media={mediaDetails} mediaType={mediaType} />
        ) : (
          <></>
        )} */}
      </Box>
    </Box>
  );
}
