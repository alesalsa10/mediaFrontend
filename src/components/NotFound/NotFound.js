import { Alert } from '@mui/material';
import React from 'react';
import Navigation from '../Navigation/Navigation';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <Alert sx={{ m: 5, p: 5}} severity='info'>
        This page does not exist
      </Alert>
    </>
  );
}
