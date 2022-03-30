import { Box, Typography } from '@mui/material';
import React from 'react';

export default function PersonalInfo({ info }) {
  const getCreditsCount = () => {
    if (info.combined_credits.cast && info.combined_credits.crew) {
      return (
        info.combined_credits.cast.length + info.combined_credits.crew.length
      );
    } else if (info.combined_credits.cast && !info.combined_credits.crew) {
      return info.combined_credits.cast.length;
    } else if (info.combined_credits.crew && !info.combined_credits.cast) {
      return info.combined_credits.crew;
    } else {
      return 'No credits available';
    }
  };

  const getGender = () => {
    if (info.gender === 2) {
      return 'Male';
    } else if (info.gender === 1) {
      return 'Female';
    } else {
      return 'Gender not available';
    }
  };

const getAge = (dateString)=> {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

  const getBirthday = () =>{
    if(info.birthday){
        return `${info.birthday} (${getAge(info.birthday)} years old)`
    }else {
        return 'Birthday not available'
    }
  }


  return (
    <Box>
      <Typography
        variant='h6'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 600 }}
      >
        Personal Info
      </Typography>
      <Typography
        variant='body1'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 550 }}
      >
        Known For
      </Typography>
      <Typography variant='body1' component={'div'} sx={{ py: '0' }}>
        {info.known_for_department || 'No info available'}
      </Typography>
      <Typography
        variant='body1'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 550 }}
      >
        Known Credits
      </Typography>
      <Typography variant='body1' component={'div'} sx={{ py: '0' }}>
        {getCreditsCount()}
      </Typography>
      <Typography
        variant='body1'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 550 }}
      >
        Gender{' '}
      </Typography>
      <Typography variant='body1' component={'div'} sx={{ py: '0' }}>
        {getGender()}
      </Typography>
      <Typography
        variant='body1'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 550 }}
      >
        Birthday{' '}
      </Typography>
      <Typography variant='body1' component={'div'} sx={{ py: '0' }}>
        {getBirthday()}
      </Typography>
      <Typography
        variant='body1'
        component={'div'}
        sx={{ py: '0.5rem', fontWeight: 550 }}
      >
        Place of Birth{' '}
      </Typography>
      <Typography variant='body1' component={'div'} sx={{ py: '0' }}>
        {info.place_of_birth ? info.place_of_birth : 'Not available'}
      </Typography>
    </Box>
  );
}
