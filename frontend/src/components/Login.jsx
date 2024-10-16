import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use this for navigation
import axios from 'axios';
import './Login.css'; // Create this CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
        username, 
        password 
      });
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to the booking grid page after login
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid username or password'); // Show error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <div className="register-section">
        <p>New User?</p>
        <button 
          className="register-button" 
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
