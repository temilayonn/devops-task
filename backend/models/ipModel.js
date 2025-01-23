// const mongoose = require('mongoose');

// // Define the schema for storing reversed IPs
// const ipSchema = new mongoose.Schema({
//   ip: { type: String, required: true },
// }, { timestamps: true });

// // Create a model for the IP schema
// const IP = mongoose.model('IP', ipSchema);
// module.exports = IP;


const sqlite3 = require('sqlite3').verbose();

// Create a function to open the database connection
const openDatabase = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('reversed_ips.db', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

// Create a function to create the table if it doesn't exist
const createTable = async (db) => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS reversed_ips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Create a function to insert an IP address
const insertIP = async (db, ip) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO reversed_ips (ip) VALUES (?)`,
      [ip],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Create a function to get all IP addresses
const getAllIPs = async (db) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM reversed_ips', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Export the database functions
module.exports = {
  openDatabase,
  createTable,
  insertIP,
  getAllIPs,
};