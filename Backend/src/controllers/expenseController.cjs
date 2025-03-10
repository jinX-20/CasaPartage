const Expense = require("../models/expenses.cjs");

const getDueExpenses = async (req, res) => {
  try {
    const { user } = req.query; 
    const dueExpenses = await Expense.find({
      "participants.name": user,
      "participants.status": "pending"
    });

    if (!dueExpenses.length) {
      return res.status(200).json({ success: true, message: "No due expenses found", expenses: [] });
    }

    res.status(200).json({ success: true, expenses: dueExpenses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch due expenses" });
  }
};


const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find(); // Query the expenses from the database
    if (expenses.length === 0) {
      return res.status(200).json({ success: true, message: "No expenses found", expenses: [] });
    }
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const getYourExpenses = async (req, res) => {
  try {
    const { paidBy } = req.query; 

    const expenses = await Expense.find({ paidBy });

    if (expenses.length === 0) {
      return res.status(200).json({ success: true, message: "No expenses found", expenses: [] });
    }

    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};



const addExpense = async (req, res) => {
  try {
    const { description, totalAmount, participants, date, splitDetails, paidBy } = req.body;

    const newExpense = new Expense({
      description,
      totalAmount,
      date,
      paidBy,
      participants,
      splitDetails
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error("Error while saving expense:", error);
    res.status(500).json({ error: "Server error" });
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
    if (String(expense.paidBy) !== String(paidBy)) {
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

module.exports = { getAllExpenses, addExpense, deleteExpense, markExpenseAsPaid, getYourExpenses, getDueExpenses};
