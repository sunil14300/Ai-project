// backend/routes/sessions.js
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect these routes

// @route   POST api/sessions
// @desc    Create a new session
// @access  Private (requires authentication)
router.post('/', authMiddleware, sessionController.createSession);

// @route   GET api/sessions
// @desc    Get all sessions for the authenticated user
// @access  Private (requires authentication)
router.get('/', authMiddleware, sessionController.getSessions);

// @route   GET api/sessions/:id
// @desc    Get a single session by ID for the authenticated user
// @access  Private (requires authentication)
router.get('/:id', authMiddleware, sessionController.getSessionById);

// @route   PUT api/sessions/:id
// @desc    Update an existing session (e.g., auto-save chat, code)
// @access  Private (requires authentication)
router.put('/:id', authMiddleware, sessionController.updateSession);

// @route   DELETE api/sessions/:id
// @desc    Delete a session
// @access  Private (requires authentication)
router.delete('/:id', authMiddleware, sessionController.deleteSession);

module.exports = router;
