const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

module.exports = db;