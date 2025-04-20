const express = require('express');
const db = require('../db');
const router = express.Router();

// Create a new user
router.post('/', (req, res) => {
    const { username, email, password_hash } = req.body;
    const query = `INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)`;
    db.run(query, [username, email, password_hash], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ user_id: this.lastID });
        }
    });
});

// Get all users
router.get('/', (req, res) => {
    const query = `SELECT * FROM Users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;