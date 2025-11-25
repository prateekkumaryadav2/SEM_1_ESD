import React, {useState, useEffect} from 'react';
import API from '../api';

export default function Login({onLogin}){
  const [u,setU] = useState('');
  const [p,setP] = useState('');
  const [err,setErr] = useState(null);
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
    setErr(null);
    const res = await API.googleLogin(response.credential);
    setLoading(false);
    if (res.token) {
      onLogin(res.token);
    } else {
      setErr(res.error || 'Google login failed');
    }
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const res = await API.login(u,p);
    setLoading(false);
    if (res.token) onLogin(res.token);
    else setErr(res.error || 'Login failed');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      backgroundImage: 'url(/images/login-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Overlay for better readability */}
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
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-0">
                  <i className="bi bi-mortarboard-fill me-2"></i>
                  Academic Portal
                </h3>
              </div>
              <div className="card-body p-5">
                <h5 className="card-title text-center mb-4">Sign In</h5>
                
                {err && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {err}
                    <button type="button" className="btn-close" onClick={() => setErr(null)}></button>
                  </div>
                )}

                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      <i className="bi bi-person-fill me-2"></i>Username
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="username"
                      placeholder="Enter your username"
                      value={u} 
                      onChange={e=>setU(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Password
                    </label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      id="password"
                      placeholder="Enter your password"
                      value={p} 
                      onChange={e=>setP(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="position-relative my-4">
                  <hr />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                    OR
                  </span>
                </div>

                {/* Google Sign-In Button */}
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
              <small className="text-muted">
                © 2025 Academic Management System. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
