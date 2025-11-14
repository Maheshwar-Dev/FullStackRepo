import React, { useState } from 'react';
import { addEquipment } from '../api';

function AddEquipment() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !pricePerDay) {
      alert("Name and Price are required!");
      return;
    }

    try {
      await addEquipment({ name, description, pricePerDay: Number(pricePerDay) });
      alert("Equipment added successfully!");
      setName(''); setDescription(''); setPricePerDay('');
    } catch (err) {
      console.error("Error adding equipment:", err);
      alert("Failed to add equipment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Add Equipment</h2>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input 
        placeholder="Price Per Day" 
        type="number"
        value={pricePerDay} 
        onChange={e => setPricePerDay(e.target.value)} 
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button type="submit">Add Equipment</button>
    </form>
  );
}

export default AddEquipment;
