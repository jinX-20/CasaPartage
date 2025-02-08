const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }, // Ensures positive values
    paidBy: { type: String, required: true }, // Could be referenced to Roommate model
    date: { type: Date, required: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("Expense", expenseSchema);