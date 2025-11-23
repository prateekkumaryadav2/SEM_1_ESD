import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically adds the JWT token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve token from Session Storage as per your notes
    const token = sessionStorage.getItem('jwt_token');
    
    if (token) {
      // Append the "Bearer " prefix as required by Spring Security
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
