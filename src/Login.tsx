import React, { useState } from 'react';
import api, { setAuthToken } from './api';

const Login: React.FC = () => {
  const [username, setEmail] = useState('');
  const [passwd, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, passwd });
      const { token } = response.data;
      
      // Save token to local storage
      localStorage.setItem('authToken', token);

      // Set token in axios headers
      setAuthToken(token);

      // Redirect or update the app state as needed
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={passwd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;