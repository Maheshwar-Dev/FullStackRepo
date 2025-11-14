import React, { useState } from 'react';
import { registerUser } from '../api';
import './Auth.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page refresh
    try {
      const res = await registerUser(formData);
      setMessage('✅ Registration successful! You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-card">
        <h2>Create Your Account 🚀</h2>
        <p className="subtitle">Join <strong>RentIt</strong> and start renting smarter.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
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

          {/* ✅ this is the working form submit button */}
          <button type="submit" className="auth-btn">Register</button>
        </form>

        {message && <p className="info">{message}</p>}

        <p className="switch-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
