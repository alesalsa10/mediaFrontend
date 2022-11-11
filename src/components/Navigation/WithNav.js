import React, { useLayoutEffect, useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSelf } from '../../features/auth/authSlice';
import { Alert, CircularProgress, Box } from '@mui/material';
import api from '../../services/api';
import styles from './WithNav.module.css';

export default function WithNav() {
  const location = useLocation();
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    error: null,
    response: null,
    loading: false,
  });

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (authData.isAuth && !authData.user) {
      const self = setTimeout(() => {
        dispatch(getSelf());
      }, 0);
      return () => clearTimeout(self);
    }
  }, [authData.isAuth, authData.user]);

  const resendEmail = async () => {
    console.log('clicked');
    setState({ loading: true, response: null, error: null });
    try {
      const response = await api.post(`auth/verify/resendEmail`, {
        email: authData.user.email,
      });
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

  return (
    <>
      <Navigation />
      {authData.isAuth && authData.user && !authData.user.isVerified && location.pathname !== '/settings' ? (
        <div className={styles.banner}>
          <Alert severity='warning' sx={{ p: 1, m: 0 }}>
            Pleae, verify your email. Click{' '}
            <span
              style={{ fontWeight: 700, cursor: 'pointer', fontSize: 16 }}
              onClick={resendEmail}
            >
              here
            </span>{' '}
            to send a new verification email.
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '0.5rem',
                }}
              >
                <CircularProgress />
              </Box>
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
          </Alert>
        </div>
      ) : (
        <></>
      )}
      <Outlet />
    </>
  );
}
