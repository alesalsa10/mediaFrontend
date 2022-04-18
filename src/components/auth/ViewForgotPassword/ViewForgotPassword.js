import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

const axios = require('axios').default;

export default function ViewForgotPassword() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  let token = useParams();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/resetPassword/${token.token}`,
        { password: password }
      );
      setData(response.data.Msg);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 400) {
        setError(e.response.data.errors);
        setData(undefined);
        setLoading(false);
      } else {
        setError(e.response.data.Msg);
        setData(undefined);
        setLoading(false);
      }
    }
  };

  const checkErrors = (errors, name) => {
    //firs validation layer on the backend
    if (!errors) {
      return false;
    } else if (Array.isArray(errors)) {
      return errors.some(function (el) {
        return el.param === name;
      });
    }
  };

  const chooseHelperText = (errors, name) => {
    if (!errors) {
      return null;
    } else if (Array.isArray(errors)) {
      const obj = errors.find((el) => el.param === name);
      if (obj) {
        return obj.msg;
      }
    }
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item>
        <Box
          maxWidth={'sm'}
          sx={{
            marginTop: 8,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 4,
            p: 2,
            color: 'text.primary',
            backgroundColor: 'background.paper',
            borderRadius: 1,
          }}
        >
          {data ? (
            <>
              <Alert variant='outlined' severity='success'>
                {data}
              </Alert>
              <Grid container justifyContent='center'>
                <Grid item>
                  <Link href='/signin' variant='body2'>
                    You can log in now
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                Reset Password
              </Typography>
              {error ? (
                <Alert variant='outlined' severity='error'>
                  {error}
                </Alert>
              ) : (
                <></>
              )}
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label=' New Password'
                  type='password'
                  id='password'
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                  error={checkErrors(error, 'password')}
                  helperText={chooseHelperText(error, 'password')}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress /> : 'Reset Password'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
