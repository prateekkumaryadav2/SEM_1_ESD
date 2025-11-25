import React from 'react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button 
      className="btn btn-outline-light theme-toggle" 
      onClick={toggleDarkMode}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{border: '1px solid rgba(255, 255, 255, 0.5)'}}
    >
      <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-fill'}`}></i>
    </button>
  );
};

export default ThemeToggle;
