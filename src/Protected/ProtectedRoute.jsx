import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {


  
  const  authenticated  = localStorage.getItem('authenticated')
 


  return (authenticated ? element : <Navigate to="/login" replace />);
};

export default ProtectedRoute;
