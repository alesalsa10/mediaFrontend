import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../../features/auth/authSlice';
import { Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';

export default function WithNav() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const [state, setState] = useState({
    error: null,
    response: null,
    loading: false,
  });

  const resendEmail = async () => {
    console.log('clicked');
    setState({ loading: true, response: null, error: null });
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/verify/resendEmail`,
        {
          email: authData.user.email,
        }
      );
      console.log(response.data);
      setState({
        error: null,
        response: 'Email successfully sent',
        loading: false,
      });
    } catch (err) {
      console.log(err.response.data.Msg);
      setState({
        error: err.response.data.Msg,
        response: null,
        loading: false,
      });
    }
  };

  // useEffect(() =>{
  //   if(authData.isAuth && !authData.accessToken ){
  //     dispatch(refreshToken())
  //   }
  // }, [authData.isAuth, authData.accessToken])

  useEffect(() => {
    if (state.response) {
      const time = setTimeout(() => {
        setState({ error: null, response: null, loading: false });
      }, 5000);
      return () => {
        clearTimeout(time);
      };
    }
  });

  return (
    <>
      <Navigation />
      {authData.isAuth && !authData.user.isVerified ? (
        <Alert severity='warning' variant='outlined' sx={{ p: 2, m: 2 }}>
          An email has been sent to you to verify your account. Without
          verification, you will have limited access. If you did not received
          one, click{' '}
          <span
            style={{ fontWeight: 550, cursor: 'pointer' }}
            onClick={resendEmail}
          >
            here
          </span>{' '}
          to send a new one.
          {state.response ? (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              {state.response}
            </p>
          ) : state.loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
              <CircularProgress />
            </Box>
          ) : (
            <></>
          )}
        </Alert>
      ) : (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.5rem',
          }}
        >
          {state.error}
        </p>
      )}
      <Outlet />
    </>
  );
}
