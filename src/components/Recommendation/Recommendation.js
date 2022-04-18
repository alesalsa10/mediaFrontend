import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import Card from '../Card/Card';

export default function Recommendation({ recommendations }) {
  return (
    <>
      <Grid container>
        <Grid item sx={{ pt: 3 }}>
          <Typography
            component={'h2'}
            variant='h5'
            sx={{ color: 'text.primary' }}
          >
            Recommendations
          </Typography>
        </Grid>
      </Grid>
      {recommendations.length > 0 ? (
        <>
          <Grid item sx={{ py: 3 }} xs={12}>
            <Box
              className={'scrollList'}
              sx={{
                py: 1,
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
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'left', my: 1 }}>
              No recommendations available
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
