const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  createdBy: { type: String, required: true }, // username of creator
}, { timestamps: true, collection: 'equipment' });

module.exports = mongoose.model('Equipment', equipmentSchema);
