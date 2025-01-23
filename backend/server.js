const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('ips.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`CREATE TABLE IF NOT EXISTS ip_addresses (id INTEGER PRIMARY KEY, ip TEXT)`);
  }
});

// Save reversed IP to the database
app.post('/save-ip', (req, res) => {
  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }
  db.run('INSERT INTO ip_addresses (ip) VALUES (?)', [ip], function (err) {
    if (err) {
      res.status(500).json({ error: 'Failed to save IP address' });
    } else {
      res.status(200).json({ message: 'IP address saved', id: this.lastID });
    }
  });
});

// Fetch all saved IPs
app.get('/ips', (req, res) => {
  db.run('SELECT * FROM ip_addresses', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch IP addresses' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

