const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Admin = require('../models/Admin');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Delete user and their products
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await Product.deleteMany({ owner: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User and their products deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
