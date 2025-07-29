const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists with the given email
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new User instance
    user = new User({
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Save the new user to the database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id, // User ID from MongoDB
      },
    };

    // Sign the JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/auth/user
// @desc    Get authenticated user (for frontend to verify token and get user info)
// @access  Private
exports.getAuthenticatedUser = async (req, res) => {
  try {
    // Find user by ID from the token payload, exclude password field
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
