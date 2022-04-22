import React, { useLayoutEffect } from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';

export default function WithNav() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
