import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  Backdrop,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { default: axios } = require('axios');
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;
export default function Settings() {
  const authData = useSelector((state) => state.auth);
  const [state, setState] = useState({
    response: null,
    error: null,
    loading: true,
  });
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [change, setChange] = useState({
    response: null,
    error: null,
    loading: null,
  });

  const getSelf = async () => {
    try {
      const response = await axios.get(`${baseURL}users/self`, {
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

  const toggleUsername = () => {
    setIsUsernameOpen(!isUsernameOpen);
    console.log(isUsernameOpen);
    setChange({ loading: false, response: null, error: null });
  };

  const checkErrors = (error, name) => {
    //firs validation layer on the backend
    if (!error) {
      return false;
    } else if (Array.isArray(error.errors)) {
      return error.errors.some(function (el) {
        return el.param === name;
      });
    }
  };

  const chooseHelperText = (error, name) => {
    if (!error) {
      return null;
    } else if (Array.isArray(error.errors)) {
      const obj = change.error.errors.find((el) => el.param === name);
      if (obj) {
        return obj.msg;
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const saveUsername = async () => {
    setChange({ response: false, loading: true, error: false });
    try {
      const response = await axios.put(
        `${baseURL}users/username/${state.response._id}`,
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setState((prevState) => ({
        ...prevState,
        response: {
          ...prevState.response,
          username: username,
        },
      }));
      setChange({ response: true, loading: false, error: false });
      setIsUsernameOpen(false);
    } catch (error) {
      console.log(error);
      setChange({ response: true, loading: false, error: error.response.data });
    }
  };

  useEffect(() => {
    getSelf();
  }, []);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8} py={8} px={{ xs: 3, md: 0 }}>
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
                  <Button variant='outlined' onClick={toggleUsername}>
                    Change
                  </Button>
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
      <Modal
        open={isUsernameOpen}
        onClose={toggleUsername}
        aria-labelledby='delete comment confirmation'
        aria-describedby='confirmation for delete'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          color: 'text.primary',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            minWidth: 350,
            p: 4,
            backgroundColor: 'background.paper',
          }}
        >
          {change.error &&
          change.error.Msg &&
          typeof change.error.Msg === 'string' ? (
            <Alert severity='error' sx={{ mb: 2 }}>
              {change.error.Msg}
            </Alert>
          ) : (
            <></>
          )}
          <Typography varaint='h6'>Update username</Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='username'
            name='username'
            autoComplete='username'
            autoFocus
            placeholder='Enter new username'
            inputProps={{ maxLength: 25 }}
            error={checkErrors(change.error, 'username')}
            onChange={handleUsernameChange}
            helperText={chooseHelperText(change.error, 'username')}
          />
          <Box>
            <Button
              variant='outlined'
              onClick={saveUsername}
              disabled={change.loading}
              fullWidth
            >
              {change.loading && !change.error ? (
                <CircularProgress size={20} />
              ) : (
                'Save Username'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}
