const Group = require("../models/group.cjs");
const User = require("../models/user.cjs");
const Task = require("../models/task.cjs");
const Bill = require("../models/bill.cjs");

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members tasks bills");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new group using member names
exports.createGroup = async (req, res) => {
  try {
    const { groupName, memberNames } = req.body;

    if (!groupName || !Array.isArray(memberNames)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const members = await User.find({ name: { $in: memberNames } });

    if (members.length !== memberNames.length) {
      return res.status(404).json({ success: false, message: "Some members not found" });
    }

    const newGroup = new Group({ groupName, members: members.map((m) => m._id) });
    await newGroup.save();

    res.status(201).json({ success: true, message: "Group created", group: newGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a group by name
exports.deleteGroup = async (req, res) => {
  try {
    const { groupName } = req.params;

    const deletedGroup = await Group.findOneAndDelete({ groupName });

    if (!deletedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, message: "Group deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};