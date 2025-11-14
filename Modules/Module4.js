const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Get all equipment
router.get('/', async (req, res) => {
  try {
    const items = await Equipment.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new equipment
router.post('/', async (req, res) => {
  try {
    const { name, description, pricePerDay, available, createdBy } = req.body;

    if (!name || !description || !pricePerDay || !createdBy) {
      return res.status(400).json({ message: 'Name, description, pricePerDay, and createdBy are required.' });
    }

    const price = Number(pricePerDay);
    if (isNaN(price)) {
      return res.status(400).json({ message: 'pricePerDay must be a number' });
    }

    const newEquipment = new Equipment({
      name,
      description,
      pricePerDay: price,
      available: available !== undefined ? available : true,
      createdBy
    });

    const saved = await newEquipment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error adding equipment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update equipment availability
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete equipment
router.delete('/:id', async (req, res) => {
  try {
    const { userName } = req.query;

    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Check if the current user is the creator
    if (item.createdBy !== userName) {
      return res.status(403).json({ message: 'You are not authorized to delete this item' });
    }

    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error('Error deleting equipment:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
