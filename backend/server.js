// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const reverseIPRoute = require('./routes/reverseIP');
// const app = express();

// // Middleware
// app.use(cors());

// mongoose.connect(process.env.MONGODB_URI , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// // Routes
// app.use(reverseIPRoute);

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const reverseIPRoute = require('./routes/reverseIP');
const db = require('./ipModel'); // Import the database functions

const app = express();

// Middleware
app.use(cors());

// Connect to the database (async/await pattern)
const startServer = async () => {
  try {
    await db.openDatabase(); // Open the database connection
    await db.createTable(); // Create the table if it doesn't exist

    // Start the server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process if there's an error
  }
};

// Routes
app.use(reverseIPRoute);

// Start the server
startServer();