import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ token, redirectTo, children }) {
  const savedToken = token || localStorage.getItem('token');
  return savedToken ? children : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
