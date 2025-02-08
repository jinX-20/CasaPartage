const express = require('express');
const { getRoommateById, getAllRoommates, addRoommate, deleteRoommate } = require('../controllers/roommateController');

const router = express.Router();

// GET a single roommate by ID
router.get('/roommate/:id', getRoommateById);

// GET all roommates
router.get('/roommates', getAllRoommates);

// POST (add) a new roommate
router.post('/roommate', addRoommate);

// DELETE a roommate by ID
router.delete('/roommate/:id', deleteRoommate);

module.exports = router;