import React, {useState, useEffect} from 'react';
import Login from './pages/Login';
import Courses from './pages/Courses';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  const onLogin = (t) => { localStorage.setItem('authToken', t); setToken(t); };
  const onLogout = () => { localStorage.removeItem('authToken'); setToken(null); };
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return token ? 
    <Courses token={token} onLogout={onLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : 
    <Login onLogin={onLogin} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}
