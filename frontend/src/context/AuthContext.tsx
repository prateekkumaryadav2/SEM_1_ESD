import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (newToken: string, userRole: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('userRole'));

  const login = (newToken: string, userRole: string): void => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userRole', userRole);
    setToken(newToken);
    setRole(userRole);
  };

  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setToken(null);
    setRole(null);
  };

  const isAuthenticated = (): boolean => {
    return !!token;
  };

  const isAdmin = (): boolean => {
    return role?.toUpperCase() === 'ADMIN';
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
