import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userData } from '../utils/auth';
import logo from '../assets/logo-no-background.png';

function Welcome() {
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
