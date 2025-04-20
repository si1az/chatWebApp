const express = require('express');
const db = require('../db');
const router = express.Router();

// Create a new room
router.post('/', (req, res) => {
    const { room_name, created_by, description } = req.body;
    const query = `INSERT INTO Rooms (room_name, created_by, description) VALUES (?, ?, ?)`;
    db.run(query, [room_name, created_by, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ room_id: this.lastID });
        }
    });
});

// Get all rooms
router.get('/', (req, res) => {
    const query = `SELECT * FROM Rooms`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;