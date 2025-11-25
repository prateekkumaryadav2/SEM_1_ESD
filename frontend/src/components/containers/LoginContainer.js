import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LoginForm from '../presentation/LoginForm';
import ThemeToggle from '../presentation/ThemeToggle';

const LoginContainer = () => {
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '454157658624-ga2m3aviiiapqbchp36gjbluien3oc68.apps.googleusercontent.com',
          callback: handleGoogleResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { 
            theme: 'outline', 
            size: 'large',
            width: '100%',
            text: 'continue_with'
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError(null);
    const res = await API.googleLogin(response.credential);
    setLoading(false);
    if (res.token) {
      login(res.token);
    } else {
      setError(res.error || 'Google login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await API.login(username, password);
    setLoading(false);
    if (res.token) {
      login(res.token);
    } else {
      setError(res.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      backgroundImage: 'url(/images/login-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }}></div>
      
      <div className="container" style={{position: 'relative', zIndex: 2}}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="position-relative mb-3 d-flex justify-content-end">
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-0">
                  <i className="bi bi-mortarboard-fill me-2"></i>
                  Academic Portal
                </h3>
              </div>
              
              <div className="card-body p-5">
                <h5 className="card-title text-center mb-4">Sign In</h5>
                
                <LoginForm
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                  onErrorClose={() => setError(null)}
                />

                <div className="position-relative my-4">
                  <hr />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                    OR
                  </span>
                </div>

                <div id="googleSignInButton" className="d-flex justify-content-center"></div>
              </div>
              
              <div className="card-footer text-center py-3 bg-light">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Default credentials: <strong>admin</strong> / <strong>password</strong>
                </small>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <div 
                className="d-inline-block px-4 py-2 rounded-pill shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <small style={{ color: '#6c757d' }}>
                    © 2025 Academic Management System. All rights reserved.
                  </small>
                  <a 
                    href="https://github.com/prateekkumaryadav2/SEM_1_ESD" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                    title="View Source Code on GitHub"
                  >
                    <i className="bi bi-github" style={{ fontSize: '1.5rem' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
