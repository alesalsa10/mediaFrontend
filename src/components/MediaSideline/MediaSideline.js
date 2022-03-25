import { Typography, Box } from '@mui/material';
import React, { useState } from 'react';
const tags = require('language-tags');

export default function MediaSideline({ media, mediaType }) {
  let langName = null;
  if (media.original_language) {
    let orginalLanguageInfo = tags.language(media.original_language);
    if (orginalLanguageInfo) {
      langName = orginalLanguageInfo.data.record.Description[0];
    }
  }
  return (
    <Box sx={{ boxShadow: 3, my: 10, p: 2, mx: 1 }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        Facts
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: '500' }}>
        Status
      </Typography>
      <Typography variant='body1' sx={{ pb: 1 }}>
        {media.status}
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: '500' }}>
        Original Language
      </Typography>
      <Typography>{langName || 'No Name here'}</Typography>
      {mediaType === 'movie' ? (
        <>
          <Typography variant='h6' sx={{ fontWeight: '500' }}>
            Budget
          </Typography>
          <Typography variant='body1' sx={{ pb: 1 }}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(media.budget) || 'Budget not found'}
          </Typography>
        </>
      ) : (
        <></>
      )}
      {mediaType === 'movie' ? (
        <>
          <Typography variant='h6' sx={{ fontWeight: '500' }}>
            Revenue
          </Typography>
          <Typography variant='body1' >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(media.revenue) || 'Revenue not found'}
          </Typography>
        </>
      ) : (
        <></>
      )}
      {mediaType === 'tv' ? (
        <>
          <Typography variant='h6' sx={{ fontWeight: '500' }}>
            Type
          </Typography>
          <Typography variant='body1' >{media.type}</Typography>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
