const express = require("express");
const {
  getAllExpenses,
  addExpense,
  deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

// Get all expenses
router.get("/", getAllExpenses);

// Add a new expense
router.post("/", addExpense);

// Delete an expense by ID
router.delete("/:id", deleteExpense);

module.exports = router;