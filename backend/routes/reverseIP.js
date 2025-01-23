const express = require('express');
const router = express.Router();
const ipController = require('../controllers/ipController');

// Define the route to reverse the IP
router.get('/reverse_ip', ipController.reverseIP);

module.exports = router;
