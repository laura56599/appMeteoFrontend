import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ token, redirectTo, children }) {
  return token ? children : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
