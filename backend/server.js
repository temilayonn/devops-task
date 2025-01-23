const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reverseIPRoute = require('./routes/reverseIP');
const app = express();

// Middleware
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/reversed_ips', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.use(reverseIPRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
