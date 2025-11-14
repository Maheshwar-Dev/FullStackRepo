const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create schema for admin
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, { collection: 'adminaccounts' }); 



// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: true
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;


