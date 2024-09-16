import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import Toaster from './Toaster';

function Register() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [registerStatus, setRegisterStatus] = useState('');

  const navigate = useNavigate();

  function changeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function registerHandler() {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:5000/api/v1/register',
        data,
        config,
      );
      console.log('Register : ', response);
      setRegisterStatus({ msg: 'Success', key: Math.random() });
      navigate('/app/welcome');
      localStorage.setItem('userData', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setRegisterStatus({ msg: error.response?.data?.message, key: Math.random() });
      setLoading(false);
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="dark" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        <div className="login-box">
          <h1>Create a new account</h1>
          <TextField
            onChange={changeHandler}
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            onKeyDown={(e) => {
              if (e.code === 'Enter') registerHandler();
            }}
          />
          <TextField
            onChange={changeHandler}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            onKeyDown={(e) => {
              if (e.code === 'Enter') registerHandler();
            }}
          />
          <TextField
            onChange={changeHandler}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onKeyDown={(e) => {
              if (e.code === 'Enter') registerHandler();
            }}
          />
          <Button variant="outlined" onClick={registerHandler}>
            Sign Up
          </Button>
          <p>
            Already have an account? Login{' '}
            <Link to=".." className="link">
              here
            </Link>
          </p>
          {registerStatus ? (
            <Toaster key={registerStatus.key} message={registerStatus.msg} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Register;
