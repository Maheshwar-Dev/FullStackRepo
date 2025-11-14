import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users'),
          axios.get('http://localhost:5000/api/admin/products')
        ]);
        setUsers(userRes.data);
        setProducts(productRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user and their products?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      setProducts(products.filter(p => p.owner?._id !== id));
    } catch (err) {
      alert('Error deleting user');
    }
  };

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section className="dashboard-section">
        <h2>👥 Registered Users</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboard-section">
        <h2>📦 Listed Products</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Owner</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.owner?.name || 'Deleted User'}</td>
                <td>₹{prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
