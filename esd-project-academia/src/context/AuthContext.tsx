// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User, LoginResponse } from '../models/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token from session storage on app start (Maintain login status) 
  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt_token');
    const storedUser = sessionStorage.getItem('user_data');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data: LoginResponse) => {
    setToken(data.token);
    setUser(data.user);
    // Store in Session Storage as per class notes 
    sessionStorage.setItem('jwt_token', data.token);
    sessionStorage.setItem('user_data', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};