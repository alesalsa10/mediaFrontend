import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Grid, Typography, Link as MaterialLink } from '@mui/material';

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
      <Grid item xs={12} md={8} sx={{ m: 4}}>
        {data ? (
          <>
            <Alert variant='outlined' severity='success' sx={{p:4}}>
              {data}
              <Typography variant='body1'>
                You can{' '}
                <MaterialLink
                  component={Link}
                  to='/signin'
                  sx={{
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  Sign In{' '}
                </MaterialLink>
                now
              </Typography>
            </Alert>
          </>
        ) : (
          <>
            <Alert variant='outlined' severity='error' sx={{p:4}}>
              {error}
            </Alert>
          </>
        )}
      </Grid>
    </Grid>
  );
}
