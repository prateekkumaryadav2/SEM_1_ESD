import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Academic Portal
        </a>
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn btn-outline-light theme-toggle" 
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-fill'}`}></i>
          </button>
          <button className="btn btn-outline-light" onClick={onLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
