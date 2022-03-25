import { Typography, Box } from '@mui/material';
import React from 'react';
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
    <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm:'row'}, justifyContent:'space-between' }}>
      <Box>
        <Typography variant='h6' sx={{ fontWeight: '500' }}>
          Status
        </Typography>
        <Typography variant='body1' sx={{ pb: 1 }}>
          {media.status}
        </Typography>
      </Box>
      <Box>
        <Typography variant='h6' sx={{ fontWeight: '500' }}>
          Original Language
        </Typography>
        <Typography sx={{ pb: 1 }}>{langName || 'No Name here'}</Typography>
      </Box>
      <Box>
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
      </Box>
      <Box>
        {mediaType === 'movie' ? (
          <>
            <Typography variant='h6' sx={{ fontWeight: '500' }}>
              Revenue
            </Typography>
            <Typography variant='body1'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(media.revenue) || 'Revenue not found'}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {mediaType === 'tv' ? (
          <>
            <Typography variant='h6' sx={{ fontWeight: '500' }}>
              Type
            </Typography>
            <Typography variant='body1'>{media.type}</Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
