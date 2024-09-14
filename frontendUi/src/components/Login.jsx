import { Button, TextField } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <h1>Login to your account</h1>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined">Login</Button>
        <p>
          Don&apos;t have an account? Register <Link to="/register" className='link'>here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
