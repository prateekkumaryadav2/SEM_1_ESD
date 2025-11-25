import React from 'react';

interface LoginFormProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
  onErrorClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  showPassword,
  setShowPassword,
  onSubmit, 
  loading, 
  error,
  onErrorClose 
}) => {
  return (
    <>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={onErrorClose}></button>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <i className="bi bi-person-fill me-2"></i>Username
          </label>
          <input 
            type="text" 
            className="form-control form-control-lg" 
            id="username"
            placeholder="Enter your username"
            value={username} 
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            <i className="bi bi-lock-fill me-2"></i>Password
          </label>
          <div className="position-relative">
            <input 
              type={showPassword ? "text" : "password"}
              className="form-control form-control-lg" 
              id="password"
              placeholder="Enter your password"
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
              style={{paddingRight: '3rem'}}
            />
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0.5rem 1rem',
                color: '#6c757d'
              }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}-fill`}></i>
            </button>
          </div>
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
    </>
  );
};

export default LoginForm;
