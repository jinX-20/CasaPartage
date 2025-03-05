const Expense = require("../models/expenses.cjs");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find(); // Query the expenses from the database
    if (!expenses) {
      return res.status(404).json({ error: "No expenses found" });
    }
    res.json(expenses); // Return the expenses as JSON
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};



const addExpense = async (req, res) => {
  try {
    const { item, amount, paidBy, participants, date } = req.body;

    if (!item || !amount || !paidBy || !participants || !Array.isArray(participants)) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (date === "") {
      date = null;
    }

    // Create a new expense entry
    const newExpense = new Expense({
      item,
      amount,
      paidBy,
      participants,
      status: "unpaid",
      date,
    });

    await newExpense.save();

    res.status(201).json({ success: true, message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const markExpenseAsPaid = async (req, res) => {
  try {
    const { expenseId, paidBy } = req.body;  // expenseId to identify the expense and paidBy for the user who paid

    // Find the expense
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Check if the user who paid matches the "paidBy" field in the expense
    if (expense.paidBy !== paidBy) {
      return res.status(403).json({ success: false, message: "You are not authorized to mark this as paid" });
    }

    // Update the expense status to "paid"
    expense.status = "paid";
    await expense.save();

    res.status(200).json({ success: true, message: "Expense marked as paid", updatedExpense: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


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

module.exports = { getAllExpenses, addExpense, deleteExpense, markExpenseAsPaid };
