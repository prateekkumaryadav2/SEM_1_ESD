import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginContainer from './components/containers/LoginContainer';
import CoursesContainer from './components/containers/CoursesContainer';
import StudentDashboard from './components/containers/StudentDashboard';

function AppContent() {
  const { isAuthenticated, isAdmin, role } = useAuth();
  
  // Debug logging
  console.log('Auth State:', { isAuthenticated: isAuthenticated(), isAdmin: isAdmin(), role });
  
  if (!isAuthenticated()) {
    return <LoginContainer />;
  }
  
  return isAdmin() ? <CoursesContainer /> : <StudentDashboard />;
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
