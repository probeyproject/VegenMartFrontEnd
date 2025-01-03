import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { authenticated } = useSelector((state) => state.user);

  return authenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
