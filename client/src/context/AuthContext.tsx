/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, getToken, getRole, logout as logoutService } from '@/service/authService';
interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>('');
  useEffect(() => {
    const token = getToken();
    const userRole = getRole();

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    const res = await login(email, password);
    alert(res.message);
    const { token, role } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    setRole(getRole());
    setIsAuthenticated(true);
  };

  const logoutHandler = () => {
    logoutService();
    setRole('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
