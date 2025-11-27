import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LoginForm from '../presentation/LoginForm';
import ThemeToggle from '../presentation/ThemeToggle';

// Extend Window interface to include google property
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void }) => void;
          renderButton: (element: HTMLElement | null, config: any) => void;
        };
      };
    };
  }
}

const LoginContainer: React.FC = () => {
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleResponse = async (response: any): Promise<void> => {
    setLoading(true);
    setError(null);
    const res = await API.googleLogin(response.credential);
    setLoading(false);
    if ('token' in res) {
      login(res.token, res.role);
    } else if ('error' in res) {
      setError(res.error || 'Google login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await API.login(username, password);
    setLoading(false);
    if ('token' in res) {
      login(res.token, res.role);
    } else if ('error' in res) {
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
            
            <div className={`card shadow-lg border-0 ${darkMode ? 'bg-secondary text-light' : 'bg-white'}`} style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className={`card-header ${darkMode ? 'bg-dark' : 'bg-primary'} text-white text-center py-4`}>
                <h3 className="mb-0">
                  <i className="bi bi-mortarboard-fill me-2"></i>
                  Academic Portal
                </h3>
              </div>
              
              <div className="card-body p-5">
                <h5 className={`card-title text-center mb-4 ${darkMode ? 'text-light' : ''}`}>Sign In</h5>
                
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
                  <hr className={darkMode ? 'border-secondary' : ''} />
                  <span className={`position-absolute top-50 start-50 translate-middle px-3 ${darkMode ? 'bg-secondary text-light' : 'bg-white text-muted'}`}>
                    OR
                  </span>
                </div>

                <div id="googleSignInButton" className="d-flex justify-content-center"></div>
              </div>
              
              <div className={`card-footer text-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-muted'}`}>
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  Default credentials: <strong>admin</strong> / <strong>password</strong>
                </small>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <div 
                className="d-inline-block px-4 py-2 rounded-pill shadow-lg"
                style={{
                  backgroundColor: darkMode ? 'rgba(52, 58, 64, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <small className={darkMode ? 'text-light' : 'text-muted'}>
                    © 2025 Academic Management System. All rights reserved.
                  </small>
                  <a 
                    href="https://github.com/prateekkumaryadav2/SEM_1_ESD" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
                    style={{ 
                      fontSize: '1.5rem',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    title="View on GitHub"
                  >
                    <i className="bi bi-github"></i>
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
