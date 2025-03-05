const express = require("express");
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  markExpenseAsPaid
} = require("../controllers/expenseController.cjs");

const router = express.Router();
const Expense = require('../models/expenses.cjs');

router.post("/", async (req, res) => {
  try {
    const { description, totalAmount, participants, date, splitDetails, paidBy, item } = req.body;

    console.log("Received expense data:", req.body);

    const newExpense = new Expense({
      description,
      totalAmount,
      participants,
      date,
      splitDetails,
      paidBy,
      item,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error("Error while saving expense:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from MongoDB
    res.status(200).json(expenses); // Send expenses back to frontend
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Delete an expense by ID
router.delete("/:id", deleteExpense);

// Mark expense as paid
router.post("/markAsPaid", markExpenseAsPaid);

module.exports = router;
