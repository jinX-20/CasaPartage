const Expense = require("../models/expenses");

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Add a new expense
const addExpense = async (req, res) => {
  try {
    const { item, amount, paidBy, date } = req.body;

    if (!item || !amount || !paidBy || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newExpense = new Expense({ item, amount, paidBy, date });
    await newExpense.save();

    res.status(201).json({ success: true, message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = { getAllExpenses, addExpense, deleteExpense };