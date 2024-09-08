import React from 'react';
import logo from '../assets/logo-no-background.png';

function Welcome() {
  return (
    <div className='welcome-container'>
      <img src={logo} alt='Logo' className='welcome-logo' />
      <p>Welcome to Chatter App</p>
    </div>
  );
}

export default Welcome;
