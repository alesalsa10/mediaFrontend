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
  Skeleton,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeText, setChangeText] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [change, setChange] = useState({
    response: null,
    error: null,
    loading: null,
  });
  const [selectedModal, setSelectedModal] = useState();

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

  const toggleModal = (e) => {
    setIsModalOpen(!isModalOpen);
    setSelectedModal(e.target.id);
    setChangeText('');
    setCurrentPassword('');
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
    setChangeText(e.target.value);
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const saveUsername = async () => {
    setChange({ response: false, loading: true, error: false });
    try {
      const response = await axios.put(
        `${baseURL}users/username/${state.response._id}`,
        {
          username: changeText,
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
          username: changeText,
        },
      }));
      setChange({ response: true, loading: false, error: false });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      setChange({ response: true, loading: false, error: error.response.data });
    }
  };

  const saveName = async () => {
    setChange({ response: false, loading: true, error: false });
    try {
      const response = await axios.put(
        `${baseURL}users/name/${state.response._id}`,
        {
          name: changeText,
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
          name: changeText,
        },
      }));
      setChange({ response: true, loading: false, error: false });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.response.data);
      setChange({
        response: true,
        loading: false,
        error: error.response.data,
      });
    }
  };

  const savePassword = async () => {
    setChange({ response: false, loading: true, error: false });
    try {
      const response = await axios.post(
        `${baseURL}auth/changePassword/`,
        {
          currentPassword: currentPassword,
          newPassword: changeText,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setChange({ response: true, loading: false, error: false });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.response.data);
      setChange({
        response: true,
        loading: false,
        error: error.response.data,
      });
    }
  };

  const saveEmail = async () => {
    setChange({ response: false, loading: true, error: false });
    try {
      const response = await axios.post(
        `${baseURL}auth/changeEmail/`,
        {
          currentPassword: currentPassword,
          email: changeText,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      //console.log(response.data);
      setState((prevState) => ({
        ...prevState,
        response: {
          ...prevState.response,
          email: changeText,
        },
      }));
      setChange({ response: true, loading: false, error: false });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.response.data);
      setChange({
        response: true,
        loading: false,
        error: error.response.data,
      });
    }
  };

  useEffect(() => {
    document.title = 'User Settings'
    getSelf();
  }, []);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8} py={8} px={{ xs: 3, md: 0 }}>
        {state.loading && !state.error ? (
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ color: 'text.primary', borderBottom: 1, mb: 4 }}
            >
              <Skeleton
                aniamation='wave'
                height={30}
                width={150}
                sx={{ mb: 1 }}
              />
            </Grid>
            {[...Array(4).keys()].map((item, index) => (
              <Grid item xs={12} sx={{ color: 'text.primary' }} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1,
                    mb: 1
                  }}
                >
                  <Box>
                    <Skeleton height={25} width={85} animation='wave' />
                    <Skeleton height={20} width={150} animation='wave' />
                  </Box>
                  <Box>
                    <Skeleton height={50} width={85} animation='wave' />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
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
                  <Button
                    variant='outlined'
                    id='emailModal'
                    onClick={(e) => toggleModal(e)}
                  >
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
                  <Button
                    id='passwordModal'
                    variant='outlined'
                    onClick={(e) => toggleModal(e)}
                  >
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
                  <Typography variant='body1'>Username</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {state.response.username}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    id='usernameModal'
                    variant='outlined'
                    onClick={(e) => toggleModal(e)}
                  >
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
                  <Button
                    id='nameModal'
                    variant='outlined'
                    onClick={(e) => toggleModal(e)}
                  >
                    Change
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
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
          {selectedModal === 'usernameModal' ? (
            <>
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
            </>
          ) : selectedModal === 'nameModal' ? (
            <>
              <Typography varaint='h6'>Update name</Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='name'
                name='name'
                autoComplete='name'
                autoFocus
                placeholder='Enter new name'
                inputProps={{ maxLength: 25 }}
                error={checkErrors(change.error, 'name')}
                onChange={handleUsernameChange}
                helperText={chooseHelperText(change.error, 'name')}
              />
              <Box>
                <Button
                  variant='outlined'
                  onClick={saveName}
                  disabled={change.loading}
                  fullWidth
                >
                  {change.loading && !change.error ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Save Name'
                  )}
                </Button>
              </Box>
            </>
          ) : selectedModal === 'passwordModal' ? (
            <>
              <Typography varaint='h6'>Update Password</Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                type='password'
                id='currentPassword'
                label='Current Password'
                name='currentPassword'
                autoComplete='currentPassword'
                autoFocus
                placeholder='Enter Current Password'
                inputProps={{ maxLength: 25 }}
                error={checkErrors(change.error, 'currentPassword')}
                onChange={handleCurrentPassword}
                helperText={chooseHelperText(change.error, 'currentPassword')}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                type='password'
                id='newPassword'
                label='New Password'
                name='newPassword'
                autoComplete='newPassword'
                autoFocus
                placeholder='Enter New Password'
                inputProps={{ maxLength: 25 }}
                error={checkErrors(change.error, 'newPassword')}
                onChange={handleUsernameChange}
                helperText={chooseHelperText(change.error, 'newPassword')}
              />
              <Box>
                <Button
                  variant='outlined'
                  onClick={savePassword}
                  disabled={change.loading}
                  fullWidth
                >
                  {change.loading && !change.error ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Save Password'
                  )}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography varaint='h6'>Update Email</Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                type='password'
                id='currentPassword'
                label='Current Password'
                name='currentPassword'
                autoComplete='currentPassword'
                autoFocus
                placeholder='Enter Current Password'
                inputProps={{ maxLength: 25 }}
                error={checkErrors(change.error, 'currentPassword')}
                onChange={handleCurrentPassword}
                helperText={chooseHelperText(change.error, 'currentPassword')}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                type='email'
                id='newEmail'
                label='New Email'
                name='newEmail'
                autoComplete='New Email'
                autoFocus
                placeholder='Enter New Email'
                inputProps={{ maxLength: 50 }}
                error={checkErrors(change.error, 'email')}
                onChange={handleUsernameChange}
                helperText={chooseHelperText(change.error, 'email')}
              />
              <Box>
                <Button
                  variant='outlined'
                  onClick={saveEmail}
                  disabled={change.loading}
                  fullWidth
                >
                  {change.loading && !change.error ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Save Email'
                  )}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
}
