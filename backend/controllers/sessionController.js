// backend/controllers/sessionController.js
const Session = require('../models/Session');

// @route   POST api/sessions
// @desc    Create a new session for the authenticated user
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const newSession = new Session({
      userId: req.user.id, // Get user ID from the authenticated request
      name: req.body.name || 'New Session' // Use provided name or default
    });
    const session = await newSession.save(); // Save the new session
    res.json(session); // Return the created session
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/sessions
// @desc    Get all sessions for the authenticated user, sorted by last update
// @access  Private
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/sessions/:id
// @desc    Get a single session by ID for the authenticated user
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });
    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/sessions/:id
// @desc    Update a session (e.g., auto-save chat, code, UI state)
// @access  Private
exports.updateSession = async (req, res) => {
  const { chatHistory, generatedCode, uiState, name } = req.body;

  // Build an object with fields to update
  const sessionFields = {};
  if (name) sessionFields.name = name;
  if (chatHistory) sessionFields.chatHistory = chatHistory;
  if (generatedCode) sessionFields.generatedCode = generatedCode;
  if (uiState) sessionFields.uiState = uiState;
  sessionFields.updatedAt = Date.now(); // Manually update the timestamp

  try {
    // Find the session by ID and user ID
    let session = await Session.findOne({ _id: req.params.id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }

    // Update the session and return the updated document
    session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: sessionFields },
      { new: true } // Return the modified document rather than the original
    );

    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/sessions/:id
// @desc    Delete a session for the authenticated user
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    // Find and delete the session by ID and user ID
    const session = await Session.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }

    res.json({ msg: 'Session removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
