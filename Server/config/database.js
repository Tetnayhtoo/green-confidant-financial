// server/config/database.js

const sqlite3 = require('sqlite3').verbose();

// Open a database file
const db = new sqlite3.Database('../database/green-confidant-database.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create a user table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

module.exports = db;
