const mongoose = require('mongoose');

// Define the schema for storing reversed IPs
const ipSchema = new mongoose.Schema({
  ip: { type: String, required: true },
}, { timestamps: true });

// Create a model for the IP schema
const IP = mongoose.model('IP', ipSchema);
module.exports = IP;
