import React, {useEffect} from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { register } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFieldChanges = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        setPassword(e.target.value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      username: username,
      password: password,
      email: email,
    };
    dispatch(register(data));
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

  const choolseHelpter2 = (name) => {
    if (name === 'email') {
      if (
        authData.errors &&
        (authData.errors.Error === 'Email already in use' ||
          authData.errors.Error === 'Username and email already in use')
      ) {
        return authData.errors.Error;
      }
    } else if (name === 'username') {
      if (
        authData.errors &&
        (authData.errors.Error === 'Username already in use' ||
          authData.errors.Error === 'Username and email already in use')
      ) {
        return authData.errors.Error;
      }
    }
  };

    useEffect(() => {
      document.title = 'Register';
    }, []);


  useEffect(() => {
    if (authData.isAuth) {
      navigate('/')
    }
  }, [authData.isAuth]);

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
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                  onChange={handleFieldChanges}
                  value={name}
                  error={checkErrors(authData.errors, 'name')}
                  helperText={chooseHelperText(authData.errors, 'name')}
                  inputProps={{ maxLength: 50, minLength: 4 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  onChange={handleFieldChanges}
                  value={email}
                  error={
                    checkErrors(authData.errors, 'email') ||
                    (authData.errors &&
                      authData.errors &&
                      (authData.errors.Error === 'Email already in use' ||
                        authData.errors.Error ===
                          'Username and email already in use'))
                  }
                  helperText={
                    chooseHelperText(authData.errors, 'email') ||
                    choolseHelpter2('email')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  onChange={handleFieldChanges}
                  value={username}
                  error={
                    checkErrors(authData.errors, 'username') ||
                    (authData.errors &&
                      authData.errors &&
                      (authData.errors.Error === 'Username already in use' ||
                        authData.errors.Error ===
                          'Username and email already in use'))
                  }
                  helperText={
                    chooseHelperText(authData.errors, 'username') ||
                    choolseHelpter2('username')
                  }
                  inputProps={{ maxLength: 25, minLength: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  onChange={handleFieldChanges}
                  value={password}
                  error={checkErrors(authData.errors, 'password')}
                  helperText={chooseHelperText(authData.errors, 'password')}
                />
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          component='div'
                          variant='body2'
                          color='text.secondary'
                        >
                          At least 8 charcaters
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          component='div'
                          variant='body2'
                          color='text.secondary'
                        >
                          At least 1 upper case letter
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          component='div'
                          variant='body2'
                          color='text.secondary'
                        >
                          At least one lower case letter
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, height: '46px' }}
            >
              {authData.status === 'loading' ? (
                <CircularProgress color='inherit' size={'1.2rem'} />
              ) : (
                <span style={{ fontSize: '1.2rem' }}>Sign Up</span>
              )}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
