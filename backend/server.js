const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reverseIPRoute = require('./routes/reverseIP');
const app = express();

// Middleware
app.use(cors());

mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Routes
app.use(reverseIPRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
