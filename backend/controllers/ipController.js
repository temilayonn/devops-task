const IP = require('../models/ipModel');

// Reverse the given IP address
const reverseIP = (ip) => ip.split('.').reverse().join('.');

// Controller method to handle the reversal and saving of IP to MongoDB
const reverseIPController = async (req, res) => {
  try {
    // Get the client's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0';
    
    // Reverse the IP address
    const reversedIP = reverseIP(ip);

    // Save the reversed IP into MongoDB
    const newIP = new IP({ ip: reversedIP });
    await newIP.save();

    console.log('Reversed IP saved to MongoDB:', reversedIP);
    
    // Send the reversed IP as a response
    res.send(reversedIP);
  } catch (err) {
    console.error('Error in IP reversal:', err);
    res.status(500).send('Error reversing IP');
  }
};

module.exports = { reverseIP: reverseIPController };
