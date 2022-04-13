import { Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const { default: axios } = require('axios');

export default function User() {
  const params = useParams();
  const [state, setState] = useState({
    response: null,
    loading: true,
    error: null,
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${params.username}`
      );
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
    getUser();
  }, [params.username]);

  return (
    // <Box sx={{ boxShadow: 4 }}>
    //   <Box sx={{ mx: 1, borderBottom: '1px solid gray' }}>
    //     <Box>
    //       {/* {state.response} */}
    //     </Box>
    //     <Box></Box>
    //   </Box>
    //   <Box sx={{ mx: 1, borderBottom: '1px solid gray' }}></Box>
    // </Box>
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        {state.loading && !state.error ? (
          <>loading</>
        ) : !state.loading && state.error ? (
          <>error</>
        ) : (
          <>user content here</>
        )}
      </Grid>
    </Grid>
  );
}
