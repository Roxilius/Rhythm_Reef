import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PrivateRouteProps } from '@/types';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated, role, checkAuth } = useAuth();
  // console.log('isAuthenticated:', isAuthenticated);
  // console.log('role:', role);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };
    authenticate();
  }, [checkAuth]);


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
