const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set creation timestamp
  }
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
