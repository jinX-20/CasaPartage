Expense = require("../models/expenses.cjs");
User = require("../models/user.cjs");

const getDueExpenses = async (req, res) => {
  try {
    const { user } = req.query; 
    const dueExpenses = await Expense.find({
      "participants.userId": user,
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
    for (const participant of newExpense.participants) {
      participant.userId = await getUserIdFromName(participant.name); 
    }
    for (const split of newExpense.splitDetails) {
      split.userId = await getUserIdFromName(split.name); 
    }

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error("Error while saving expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserIdFromName = async (userName) => {
  userName = userName.trim();
  const currUser = await User.findOne({ name: userName });
  if (!currUser) {
    throw new Error(`User with name ${userName} not found`);
  }
  return currUser._id;
}

const markExpenseAsPaid = async (req, res) => {
  try {
    const { expenseIds, user } = req.body; 
    const expenses = await Expense.find({ '_id': { $in: expenseIds } });

    if (expenses.length === 0) {
      return res.status(404).json({ success: false, message: "No expenses found" });
    }
    for (const expense of expenses) {
      const participant = expense.participants.find(p => p.userId === user);

      if (participant) {
        participant.status = "paid"; 
      }
    }

    await Promise.all(expenses.map(expense => expense.save()));

    res.status(200).json({ success: true, message: "All expenses marked as paid" });
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
