import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
