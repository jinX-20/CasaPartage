const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' }
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paidBy: { type: String, required: true },
  participants: [participantSchema],
  splitDetails: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
