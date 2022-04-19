import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';

const axios = require('axios').default;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;

export default function VerifyEmail() {
  const token = useParams();
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${baseURL}auth/verifyEmail/${token.token}`
        );
        setData(response.data.Msg);
        setError(undefined);
      } catch (e) {
        console.log(e);
        setError(e.response.data.Msg);
        setData(undefined);
      }
    };
    verifyEmail();
  }, [token.token]);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        {data ? (
          <>
            <Alert variant='outlined' severity='success'>
              {data}
            </Alert>
          </>
        ) : (
          <>
            <Alert variant='outlined' severity='error'>
              {error}
            </Alert>
          </>
        )}
      </Grid>
    </Grid>
  );
}
