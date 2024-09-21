import React from 'react';
import { useAuth } from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
