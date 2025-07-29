// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', authController.registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.loginUser);

// @route   GET api/auth/user
// @desc    Get authenticated user details (requires token)
// @access  Private
router.get('/user', authMiddleware, authController.getAuthenticatedUser);

module.exports = router;
