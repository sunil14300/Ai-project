const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      // These options are recommended to avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Not needed in Mongoose 6+
      // useFindAndModify: false // Not needed in Mongoose 6+
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    // Log any connection errors
    console.error(err.message);
    // Exit the process with a failure code if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
