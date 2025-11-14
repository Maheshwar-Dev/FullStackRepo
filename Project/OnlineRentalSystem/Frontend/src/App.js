import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser)); // persist login
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // ✅ Admin check (assuming backend sends `role: 'admin'` for admins)
  const isAdmin = user && user.role === 'admin';

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!user ? (
        <>
          {!showRegister ? (
            <>
              <Login onLogin={handleLogin} />
              <p style={{ marginTop: '10px' }}>
                Don’t have an account?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <Register />
              <p style={{ marginTop: '10px' }}>
                Already have an account?{' '}
                <button
                  onClick={() => setShowRegister(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Login here
                </button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {isAdmin ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <Home user={user} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
