import React, { useEffect } from 'react';
import logo from '../assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  });
  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <p>Welcome to Chatter App</p>
    </div>
  );
}

export default Welcome;
