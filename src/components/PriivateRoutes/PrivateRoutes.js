import React from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoutes() {
  const authData = useSelector((state) => state.auth);

  return (
    <>
      {authData.isAuth ? (
        <Outlet />
      ) : (
        <Navigate to='/signin' />
      )}
    </>
  );
}
