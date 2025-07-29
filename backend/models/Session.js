const mongoose = require('mongoose');

// Define the Session schema
const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'New Session' // Default name for new sessions
  },
  chatHistory: [ // Array to store chat messages
    {
      role: {
        type: String, // 'user' or 'ai'
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now // Timestamp for each message
      }
    }
  ],
  generatedCode: { // Object to store generated JSX and CSS code
    jsx: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    }
  },
  uiState: { // Object to store UI editor state (e.g., property panel values)
    type: Object,
    default: {} // Default empty object for UI state
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set creation timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now // Automatically set update timestamp
  }
});

// Pre-save hook to update the `updatedAt` field on every save
SessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Session model based on the schema
module.exports = mongoose.model('Session', SessionSchema);