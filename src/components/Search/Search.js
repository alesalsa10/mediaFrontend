import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  button: {
    '& fieldset': {
      borderRadius: `90px`,
    },
  },
});

export default function Search() {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    //when i press enter it should redirect to searchResults with query strings
    if (e.keyCode === 13) {
      console.log(search.split(' ').join('+'));
      let searchQuery = search.split(' ').join('+');
      navigate(`/search?name=${searchQuery}`);
    }
  };

  const handleSearchClick = (e) => {
    console.log('you pressed the search button');
    let searchQuery = search.split(' ').join('+');
    navigate(`/search?name=${searchQuery}`);
  };

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
          onChange={handleOnChange}
          value={search}
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' onClick={handleSearchClick}>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    bgcolor: '#007aff',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    borderRadius: '90px',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  Search
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
