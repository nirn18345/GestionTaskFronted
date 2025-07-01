// src/routes/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // o tu lógica de login

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
