const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reverseIPRoute = require('./routes/reverseIP');
const app = express();

// Middleware
app.use(cors());  // Enable CORS to allow cross-origin requests
app.use(express.json());  // For parsing application/json requests

// MongoDB connection using the correct connection string for Docker
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/reversed_ips', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/reverse_ip', reverseIPRoute);  // Assuming your route is for reversing IP

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
