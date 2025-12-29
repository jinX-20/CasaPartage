const express = require('express');
const { registerController, loginController, getMe } = require('../controllers/authController.cjs');
const router = express.Router();

// routes

// REGISTER || POST
router.post('/register', registerController);

// LOGIN
router.post('/login', loginController)

// AUTH GETME
router.get('/getme', getMe);

module.exports = router