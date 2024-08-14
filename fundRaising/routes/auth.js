const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../utils/validate');

// Register User route
router.post('/register', registerValidation, validate, registerUser);

// Login User route
router.post('/login', loginValidation, validate, loginUser);

module.exports = router;
