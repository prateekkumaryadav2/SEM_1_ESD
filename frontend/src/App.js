import React, {useState} from 'react';
import Login from './pages/Login';
import Courses from './pages/Courses';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const onLogin = (t) => { localStorage.setItem('authToken', t); setToken(t); };
  const onLogout = () => { localStorage.removeItem('authToken'); setToken(null); };

  return token ? <Courses token={token} onLogout={onLogout} /> : <Login onLogin={onLogin} />;
}
