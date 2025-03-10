const express = require("express");
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  markExpenseAsPaid,
  getYourExpenses,
  getDueExpenses
} = require("../controllers/expenseController.cjs");

const router = express.Router();

router.get('/your-expenses', getYourExpenses);

router.get('/due-expenses', getDueExpenses);

router.post("/", addExpense);

// Get all expenses
router.get('/get-all-expenses', getAllExpenses);

// Delete an expense by ID
router.delete("/:id", deleteExpense);

// Mark expense as paid
router.post("/markAsPaid", markExpenseAsPaid);

module.exports = router;
