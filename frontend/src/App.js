import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginContainer from './components/containers/LoginContainer';
import CoursesContainer from './components/containers/CoursesContainer';

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated() ? <CoursesContainer /> : <LoginContainer />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
