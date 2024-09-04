/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, getRole, logout as logoutService } from '@/service/userService';
import { AuthContextType, GenericResponseType, LoginType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string>('');

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      setIsAuthenticated(false);
      setRole('');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loginHandler = async (email: string, password: string): Promise<GenericResponseType<LoginType | null>> => {
    const logged: GenericResponseType<LoginType | null> = await login(email, password);
    if (logged.data != null) {
      const { token, role } = logged.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setRole(getRole());
      setIsAuthenticated(true);
    }
    return logged;
  };

  const logoutHandler = () => {
    logoutService();
    setRole('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login: loginHandler, logout: logoutHandler, checkAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
