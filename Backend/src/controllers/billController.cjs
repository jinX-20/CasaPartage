const Bill = require("../models/bill.cjs");
const User = require("../models/user.cjs");

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("payer splitBetween");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new bill using payer and splitBetween names
exports.createBill = async (req, res) => {
  try {
    const { amount, description, payerName, splitBetweenNames } = req.body;

    if (!amount || !description || !payerName || !Array.isArray(splitBetweenNames)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const payer = await User.findOne({ name: payerName });

    if (!payer) {
      return res.status(404).json({ success: false, message: "Payer not found" });
    }

    const splitBetween = await User.find({ name: { $in: splitBetweenNames } });

    if (splitBetween.length !== splitBetweenNames.length) {
      return res.status(404).json({ success: false, message: "Some split members not found" });
    }

    const newBill = new Bill({ 
      amount, 
      description, 
      payer: payer._id, 
      splitBetween: splitBetween.map((u) => u._id) 
    });

    await newBill.save();

    res.status(201).json({ success: true, message: "Bill created", bill: newBill });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a bill by description
exports.deleteBill = async (req, res) => {
  try {
    const { description } = req.params;

    const deletedBill = await Bill.findOneAndDelete({ description });

    if (!deletedBill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({ success: true, message: "Bill deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
