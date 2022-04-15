import { Grid } from '@mui/material';
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
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8} p={8}>
        {state.loading && !state.error ? (
          <>loading</>
        ) : !state.loading && state.error ? (
          <>error</>
        ) : (
          'settings'
        )}
      </Grid>
    </Grid>
  );
}
