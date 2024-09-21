import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import Toaster from './Toaster';
import { useAuth } from '../contexts/auth.context';
import Axios from '../utils/axio.config';

function Register() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [registerStatus, setRegisterStatus] = useState('');
  const axios = new Axios();
  const navigate = useNavigate();

  function changeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function registerHandler() {
    setLoading(true);
    try {
      const response = await axios.registerUser(data);
      console.log('Register : ', response);
      setRegisterStatus({ msg: 'Success', key: Math.random() });
      localStorage.setItem('userData', JSON.stringify(response.data));
      setUser(response.data);
      navigate('/app/welcome');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setRegisterStatus({
        msg: error.response?.data?.message,
        key: Math.random(),
      });
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
          <h1 className="header">Create a new account</h1>
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
            <Link to="../login" className="link">
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
