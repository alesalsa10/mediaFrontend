import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

export default function Search() {
  return (
    <Box
      border={1}
      borderColor='red'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4' component='h4'>
            Welcome.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label='fullWidth' id='fullWidth' />
        </Grid>
      </Grid>
    </Box>
  );
}
