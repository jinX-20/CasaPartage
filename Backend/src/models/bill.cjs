const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Bill', billSchema);