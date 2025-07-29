const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// Enable CORS for all origins. In production, you should restrict this to your frontend's domain.
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Define API Routes
// Authentication routes
app.use('/api/auth', authRoutes);
// Session management routes
app.use('/api/sessions', sessionRoutes);

// Simple root route to check if API is running
app.get('/', (req, res) => {
  res.send('AI Component Generator API is running...');
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));