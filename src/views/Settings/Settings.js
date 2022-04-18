import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { default: axios } = require('axios');

export default function Settings() {
  const authData = useSelector((state) => state.auth);
  const [state, setState] = useState({
    response: null,
    error: null,
    loading: true,
  });

  const getSelf = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/self`, {
        headers: {
          Authorization: `Token ${authData.accessToken}`,
        },
      });
      console.log(response.data);
      setState({
        response: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    getSelf();
    // setState({
    //   response: null,
    //   loading: true,
    //   error: null,
    // });
  }, []);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8} py={8}>
        {state.loading && !state.error ? (
          <>loading</>
        ) : !state.loading && state.error ? (
          <>error</>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ color: 'text.primary', borderBottom: 1, mb: 4 }}
            >
              <Typography variant='h5'>User Settings</Typography>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.primary' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                }}
              >
                <Box>
                  <Typography variant='body1'>Email address</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {state.response.email}
                  </Typography>
                </Box>
                <Box>
                  <Button variant='outlined'>Change</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.primary' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                  pt: 3,
                  gap: '10px',
                }}
              >
                <Box>
                  <Typography variant='body1'>Password</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Password must be at least 8 characters long, have 1
                    uppercase, 1 lowercase, and one special character
                  </Typography>
                </Box>
                <Box>
                  <Button variant='outlined'>Change</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.primary' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                  pt: 3,
                }}
              >
                <Box>
                  <Typography variant='body1'>Username</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {state.response.username}
                  </Typography>
                </Box>
                <Box>
                  <Button variant='outlined'>Change</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.primary' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1,
                  pt: 3,
                }}
              >
                <Box>
                  <Typography variant='body1'>Name</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {state.response.name}
                  </Typography>
                </Box>
                <Box>
                  <Button variant='outlined'>Change</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
