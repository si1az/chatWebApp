const express = require('express');
const db = require('../db');
const router = express.Router();

// Create a new message
router.post('/', (req, res) => {
    const { room_id, user_id, content } = req.body;
    const query = `INSERT INTO Messages (room_id, user_id, content) VALUES (?, ?, ?)`;
    db.run(query, [room_id, user_id, content], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message_id: this.lastID });
        }
    });
});

// Get all messages
/*
router.get('/', (req, res) => {
    const query = `SELECT * FROM Messages`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});
*/

// Get all messages with usernames and room names
router.get('/', (req, res) => {
    const query = `
        SELECT m.message_id, u.username, r.room_name, m.content, m.timestamp
        FROM Messages m
        JOIN Users u ON m.user_id = u.user_id
        JOIN Rooms r ON m.room_id = r.room_id
        ORDER BY m.timestamp DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;