import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import Toaster from './Toaster';

function Login() {
  const lightMode = useSelector((state) => state.themeKey);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState('');

  const navigate = useNavigate();

  function changeHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function loginHandler() {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'http://localhost:5000/api/v1/login',
        data,
        config,
      );
      setLoginStatus({ msg: 'Success', key: Math.random() });
      navigate('/app/welcome');
      localStorage.setItem('userData', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoginStatus({
        msg: error.response?.data?.message || 'Invalid User name or Password',
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
      <div className={"login-container" + (!lightMode ? ' dark' : '')}>
        <div className={"image-container" + (!lightMode ? ' dark' : '')}>
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        <div className={"login-box" + (!lightMode ? ' dark' : '')}>
          <h1>Login to your account</h1>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            className={(!lightMode ? 'dark' : '')}
            onChange={changeHandler}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                loginHandler();
              }
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            className={!lightMode ? 'dark' : ''}
            onChange={changeHandler}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                loginHandler();
              }
            }}
          />
          <Button variant="outlined" onClick={loginHandler}>
            Login
          </Button>
          <p>
            Don&apos;t have an account? Register{' '}
            <Link to="/register" className="link">
              here
            </Link>
          </p>
          {loginStatus && (
            <Toaster key={loginStatus.key} message={loginStatus.msg} />
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
