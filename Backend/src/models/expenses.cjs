const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amountOwed: {
    type: Number,
    required: true,  // Make sure this is required if it must be provided
    default: 0,      // Optional: Set a default value (if you want)
  },
});


const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paidBy: { type: String, required: true },
  participants: [participantSchema],
  status: { type: String, default: 'pending' },
  splitDetails: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
