import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const axios = require('axios').default;

export default function ForgotPassword() {
  const theme = createTheme();
  const [email, setEmail] = useState('');
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/forgotPassword`,
        { email: email }
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
        setError('Something went wrong, try again later');
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
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            p: 2,
          }}
        >
          {data ? (
            <>
              <Typography component='h1' variant='h5'>
                Recover Password
              </Typography>
              <Alert variant='outlined' severity='success'>
                {data}
              </Alert>
            </>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                Enter account email
              </Typography>
              {error && error === 'Something went wrong, try again later' ? (
                <Alert variant='outlined' severity='error'>
                  Something went wrong, try again later
                </Alert>
              ) : (
                ''
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
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  error={checkErrors(error, 'email')}
                  helperText={chooseHelperText(error, 'email')}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  {
                    loading ? <CircularProgress/>: 'Continue'
                  }
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
