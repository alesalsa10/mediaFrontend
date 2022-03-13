import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    '& fieldset': {
      borderRadius: `90px`,
    },
  },
});

export default function Search() {
  const classes = useStyles();

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} border={1} borderColor='blue' px={1} py={2}>
        <Typography variant='h4' component='h4'>
          Welcome.
        </Typography>
        <Typography variant='h4' component='h4' pb={{ xs: 1, md: 5 }}>
          Movies, TV shows, books, and people. Explore now
        </Typography>
        <TextField
          className={classes.button}
          fullWidth
          label='Search...'
          id='search'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    backgroundColor: 'red',
                    color: '#5072a7',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    borderRadius: '90px',
                  }}
                >
                  Search
                </div>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
