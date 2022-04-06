import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { signin, togglePersist} from '../../../features/auth/authSlice';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Signin() {
  let navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const location = useLocation();
  //const from = location.state?.from?.pathname || '/';
  const hasBack = location.key !== 'default';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      password: password,
      email: email,
    };
    dispatch(signin(data));
  };

  useEffect(() => {
    if (authData.isAuth) {
      //navigate(from, { replace: true });
      //navigate(-1)
      if(hasBack){
        navigate(-1)
      }else {
        navigate('/')
      }
    }
  }, [authData.isAuth]);

  const handleRemberMeClick = (event) => {
    event.preventDefault()
    dispatch(togglePersist())  
  };

  const checkErrors = (errors, name) => {
    //firs validation layer on the backend
    if (!errors) {
      return false;
    } else if (Array.isArray(errors.errors)) {
      return errors.errors.some(function (el) {
        return el.param === name;
      });
    }
  };

  const chooseHelperText = (errors, name) => {
    if (!errors) {
      return null;
    } else if (Array.isArray(errors.errors)) {
      const obj = authData.errors.errors.find((el) => el.param === name);
      if (obj) {
        return obj.msg;
      }
    }
  };

  const handleFieldChanges = (e) => {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        setPassword(e.target.value);
        break;
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
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {authData.errors && authData.errors.Msg ? (
            <Alert variant='outlined' severity='error'>
              {authData.errors.Msg}
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
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={checkErrors(authData.errors, 'email')}
              onChange={handleFieldChanges}
              helperText={chooseHelperText(authData.errors, 'email')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={checkErrors(authData.errors, 'password')}
              onChange={handleFieldChanges}
              helperText={chooseHelperText(authData.errors, 'password')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={authData.persist}
                  color='primary'
                  onClick={handleRemberMeClick}
                  checked={authData.persist}
                />
              }
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, height: '46px' }}
            >
              {authData.status === 'loading' ? (
                <CircularProgress color='inherit' size={'1.2rem'} />
              ) : (
                <span style={{ fontSize: '1.2rem' }}>Sign In</span>
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/forgotPassword' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
