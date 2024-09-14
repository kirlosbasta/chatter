import { Button, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='login-container'>
      <div className='image-container'>
        <img src={logo} alt='Logo' className='welcome-logo' />
      </div>
      <div className='login-box'>
        <h1>Create a new account</h1>
        <TextField id='outlined-basic' label='Username' variant='outlined' />
        <TextField id='outlined-basic' label='Email' variant='outlined' />
        <TextField
          id='outlined-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
        />
        <Button variant='outlined'>Sign Up</Button>
        <p>
          Already have an account? Login <Link to=".." className='link'>here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
