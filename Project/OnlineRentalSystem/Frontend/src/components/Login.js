import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '', isAdmin: false });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = formData.isAdmin
        ? 'http://localhost:5000/api/auth/admin/login'
        : 'http://localhost:5000/api/auth/login';

      const res = await axios.post(endpoint, formData);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Sign in to continue to <strong>RentIt</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isAdmin}
                onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
              />{' '}
              Login as Admin
            </label>
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="switch-text">
          Don’t have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister?.();
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
