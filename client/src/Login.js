import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., authenticate with server)
    console.log('Login:', { email, password });
    setIsAuthenticated(true);
    history.push('/dashboard/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <div className="logo">A</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account? <span onClick={() => history.push('/signup')} className="toggle-form">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
