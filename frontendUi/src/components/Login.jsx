import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import loginImg from '../assets/logo-no-background.png';
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
        'http://localhost:8000/api/v1/login',
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
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          style={{
            alignItems: 'center',
            objectFit: 'contain',
            width: '100%',
            height: '60%',
            marginTop: '20%',
          }}
          src={loginImg}
          alt=""
        />
      </div>

      <div className="bg-gray-200 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-brightPurple p-8 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Login
          </h2>
          <div className="flex flex-col text-gray-200 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-200 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              onChange={changeHandler}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  loginHandler();
                }
              }}
            />
          </div>
          <div className="flex flex-col text-gray-200 py-2">
            <label>Password</label>
            <input
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={changeHandler}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  loginHandler();
                }
              }}
              className="p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-gray-200 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            onClick={loginHandler}
            className="w-full my-5 py-2 bg-darkBlue shadow-lg shadow-darkBlue/50 hover:shadow-darkBlue/40 text-white font-semibold rounded-lg"
          >
            SIGNIN
          </button>
          <Link to="/register" className="link">
            <p className="text-white">
              Don&apos;t have an account?{' '}
              <span className="text-darkBlue">Register here </span>
            </p>
          </Link>
          {loginStatus && (
            <Toaster key={loginStatus.key} message={loginStatus.msg} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
