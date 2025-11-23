import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/presentation/LoginForm';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import type { LoginResponse } from '../models/types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend login endpoint
      // Note: Your backend likely expects a JSON body with email/password
      const response = await api.post<LoginResponse>('/auth/login', { 
        email: email, 
        password: password 
      });

      // 1. Update Auth Context with Token & User Data
      login(response.data);

      // 2. Navigate to Dashboard using "replace" to keep history clean 
      navigate('/dashboard', { replace: true });
      
    } catch (err) {
      // Handle errors (e.g., 401 Unauthorized)
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'status' in err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm 
      email={email}
      pass={password}
      error={error}
      isLoading={isLoading}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPassChange={(e) => setPassword(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;