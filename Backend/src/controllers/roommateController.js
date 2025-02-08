const Roommate = require("../models/roommate");

// Get a roommate by ID
const getRoommateById = async (req, res) => {
    try {
        const { id } = req.params;
        const roommate = await Roommate.findById(id);
        
        if (!roommate) {
            return res.status(404).json({ success: false, message: "Roommate not found" });
        }

        res.status(200).json({ success: true, roommate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Get all roommates
const getAllRoommates = async (req, res) => {
    try {
        const roommates = await Roommate.find();
        res.status(200).json({ success: true, roommates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Add a new roommate
const addRoommate = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Validation
        if (!name || !email || !age) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        // Check if email already exists
        const existingRoommate = await Roommate.findOne({ email });
        if (existingRoommate) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const newRoommate = await Roommate.create({ name, email, age });
        res.status(201).json({ success: true, message: "Roommate added successfully", newRoommate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Delete a roommate by ID
const deleteRoommate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoommate = await Roommate.findByIdAndDelete(id);

        if (!deletedRoommate) {
            return res.status(404).json({ success: false, message: "Roommate not found" });
        }

        res.status(200).json({ success: true, message: "Roommate deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

module.exports = { getRoommateById, getAllRoommates, addRoommate, deleteRoommate };
