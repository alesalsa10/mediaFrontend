import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import placeholder from '../../assets/placeholder.png';
import KnownFor from '../KnownFor/KnownFor';

export default function PersonOverview({ data }) {
  const [sortedCast, setSortedCast] = useState([]);
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    setSortedCast(
      data.combined_credits.cast.sort(
        (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
      )
    );
    console.log(sortedCast);
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, auto)' },
        pr: 3,
        gridGap: '1rem',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        p: 1,
        boxShadow: 4,
        borderRadius: 1
      }}
    >
      <Box
        component={'img'}
        src={
          !data.profile_path ? placeholder : `${baseImgUrl}${data.profile_path}`
        }
        alt={data.name}
        sx={{
          height: 'auto',
          width: {
            xs: 150,
            sm: 300,
          },
          borderRadius: 3,
          justifySelf: { xs: 'center', sm: 'auto' },
          backgroundColor: '#a7a7a8',
        }}
      ></Box>
      <Box sx={{ overflow: 'hidden' }}>
        <Typography variant='h5' component={'div'} sx={{ py: '0.5rem' }}>
          {data.name}
        </Typography>
        <Typography variant='h6' component={'div'} sx={{ py: '0.5rem' }}>
          Biography
        </Typography>
        <Typography variant='body2' component={'div'} sx={{ py: '0.5rem' }}>
          {data.biography || 'No biography available'}
        </Typography>
        {data.combined_credits.cast.length > 0 && sortedCast.length > 0 ? (
          <KnownFor data={sortedCast} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
