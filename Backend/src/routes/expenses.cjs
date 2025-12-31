const express = require("express");
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  markExpenseAsPaid,
  getYourExpenses,
  getDueExpenses,
  getUserNameFromUserId
} = require("../controllers/expenseController.cjs");

const router = express.Router();

router.get('/your-expenses', getYourExpenses);

router.get('/due-expenses', getDueExpenses);

router.post("/add-expense", addExpense);

// Get all expenses
router.get('/get-all-expenses', getAllExpenses);

// Delete an expense by ID
router.delete("/:id", deleteExpense);

// Mark expense as paid
router.post("/due-expenses/mark-as-paid", markExpenseAsPaid);

// Get user name from user id
router.get("/getusernamefromuserid", getUserNameFromUserId);

module.exports = router;
