import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  allowedRoles: string[];
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />; // Buat halaman Unauthorized jika belum ada
  }

  return element;
};

export default PrivateRoute;
