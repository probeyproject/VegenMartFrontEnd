import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {


  
  const  authenticated  = localStorage.getItem('authenticated')
  console.log("auth " + authenticated)


  return (authenticated ? element : <Navigate to="/" replace />);
};

export default ProtectedRoute;
