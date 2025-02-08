const mongoose = require('mongoose');

const roommateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Roommate', roommateSchema);
