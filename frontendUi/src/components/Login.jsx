import React from 'react';
import { Button, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';

function Login() {
  return (
    <div className='login-container'>
      <div className='image-container'>
        <img src={logo} alt='Logo' className='welcome-logo' />
      </div>
      <div className='login-box'>
        <h1>Login to your account</h1>
        <TextField id='outlined-basic' label='Email' variant='outlined' />
        <TextField
          id='outlined-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
        />
        <Button variant='outlined'>Login</Button>
      </div>
    </div>
  );
}

export default Login;
