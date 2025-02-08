const Task = require("../models/task");
const User = require("../models/user");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignee");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new task using assignee name
exports.createTask = async (req, res) => {
  try {
    const { description, assigneeName } = req.body;

    if (!description || !assigneeName) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const assignee = await User.findOne({ name: assigneeName });

    if (!assignee) {
      return res.status(404).json({ success: false, message: "Assignee not found" });
    }

    const newTask = new Task({ description, assignee: assignee._id });
    await newTask.save();

    res.status(201).json({ success: true, message: "Task created", task: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a task by description
exports.deleteTask = async (req, res) => {
  try {
    const { description } = req.params;

    const deletedTask = await Task.findOneAndDelete({ description });

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
