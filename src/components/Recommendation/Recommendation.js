import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Card from '../Card/Card';

export default function Recommendation({ recommendations }) {
  return (
    <>
      <Grid container>
        <Grid item sx={{ px: 3, pt: 3 }}>
          <Typography component={'h2'} variant='hy'>
            Recommendations
          </Typography>
        </Grid>
      </Grid>
      {recommendations.length > 0 ? (
        <>
          <Grid item sx={{ p: 3 }} xs={12}>
            <Box
              className={'scrollList'}
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                gap: '10px',
                //width: 'fit-content',
              }}
            >
              {recommendations.map((media, index) => (
                <Card
                  key={index}
                  mediaType={media.media_type}
                  media={media}
                  type='carousel'
                />
              ))}
            </Box>
          </Grid>
        </>
      ) : (
        <Typography sx={{ textAlign: 'left', m: 1 }}>
          No recommendations available
        </Typography>
      )}
    </>
  );
}
