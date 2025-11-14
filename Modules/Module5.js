const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
 


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const equipmentRoutes = require('./routes/equipmentRoutes');
app.use('/api/equipment', equipmentRoutes); 

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminAuthRoutes = require('./routes/adminAuthRoutes');
app.use('/api/admin', adminAuthRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
