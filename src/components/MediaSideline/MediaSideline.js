import { Typography, Box } from '@mui/material';
import React, {useEffect, useState} from 'react';
const tags = require('language-tags');

export default function MediaSideline({ media, mediaType }) {
  const [lang, setLang] = useState(null)

  // let langName = null;
  // if (media.original_language) {
  //   let orginalLanguageInfo = tags.language(media.original_language);
  //   if (orginalLanguageInfo) {
  //     langName = orginalLanguageInfo.data.record.Description[0];
  //   }
  // }

  const getLanguage = (language) =>{
    let orginalLanguageInfo = tags.language(language);
    if (orginalLanguageInfo) {
      return orginalLanguageInfo.data.record.Description[0];
    }
  }

  useEffect(()=>{
    if(mediaType !== 'book'){
      if(media.original_language){
        setLang(getLanguage(media.original_language))
      }
    }else {
      if(media.volumeInfo.language){
        setLang(getLanguage(media.volumeInfo.language));
      }
    }
  }, [mediaType])
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.3rem',
      }}
    >
      {mediaType !== 'book' ? (
        <Box>
          <Typography variant='h6' sx={{ fontWeight: '500' }}>
            Status
          </Typography>
          <Typography variant='body1' sx={{ pb: 1 }}>
            {media.status || 'Not available'}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      <Box>
        <Typography variant='h6' sx={{ fontWeight: '500' }}>
          Original Language
        </Typography>
        <Typography sx={{ pb: 1 }}>{lang || 'Not available'}</Typography>
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
              }).format(media.budget) || 'Not available'}
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
              }).format(media.revenue) || 'Not available'}
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
            <Typography variant='body1'>
              {media.type || 'Not available'}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
