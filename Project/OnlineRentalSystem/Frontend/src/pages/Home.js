import React, { useEffect, useState } from 'react';
import { getEquipment, updateEquipment, deleteEquipment, addEquipment } from '../api';
import EquipmentItem from '../components/EquipmentItem';
import './Home.css';

function Home({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const fetchItems = async () => {
    try {
      const res = await getEquipment();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching equipment:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem || !description || !price) return alert('Enter item name, description, and price!');
    try {
      await addEquipment({
        name: newItem,
        description,
        pricePerDay: price,
        available: true,
        createdBy: user?.name || 'Unknown'
      });
      setNewItem('');
      setDescription('');
      setPrice('');
      fetchItems();
    } catch (err) {
      console.error('Error adding equipment:', err);
      alert(err.response?.data?.message || 'Failed to add item');
    }
  };

  const toggleRental = async (id, status) => {
    try {
      await updateEquipment(id, { available: status });
      fetchItems();
    } catch (err) {
      console.error('Error updating equipment:', err);
      alert('Failed to update item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;
    try {
      // back-end expects query param userName to enforce ownership (if implemented)
      await deleteEquipment(id, user?.name);
      fetchItems();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('You can only delete items that you added.');
      } else {
        console.error('Error deleting equipment:', err);
        alert('Failed to delete item');
      }
    }
  };

  return (
    <div className="home-root">
      <header className="home-header">
        <div className="brand">
          <h1>RentIt</h1>
          <div className="subtitle">Online Rental System</div>
        </div>

        <div className="user-controls">
          <div className="welcome">Welcome, <b>{user?.name}</b></div>
          <div className="role">{user?.isAdmin ? 'Admin' : 'User'}</div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="home-content">
        <aside className="add-panel">
          <h2>Add Item for Renting</h2>
          <div className="form-row">
            <label>Item Name</label>
            <input
              type="text"
              placeholder="Drill, Camera..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Price per day (₹)</label>
            <input
              type="number"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button className="primary-btn" onClick={handleAddItem}>Add Item</button>
        </aside>

        <section className="items-panel">
          <h2>Available Items For Renting</h2>
          {items.length === 0 ? (
            <div className="empty-state">No equipment available. Add the first item!</div>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <EquipmentItem
                  key={item._id}
                  item={item}
                  onToggle={toggleRental}
                  onDelete={handleDelete}
                  currentUser={user?.name}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
