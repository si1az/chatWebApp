const express = require('express');
const db = require('../db');
const router = express.Router();

// defines the routes for room related operations

// create new room
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

// fetch ALL rooms
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

// fetch specific room by id
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM Rooms WHERE room_id = ?`;
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            res.json(row);
        }
    });
});

// update room description
router.put('/:id', (req, res) => {
    const { description } = req.body;
    const query = `UPDATE Rooms SET description = ? WHERE room_id = ?`;
    db.run(query, [description, req.params.id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            res.json({ message: 'Room updated successfully' });
        }
    });
});

// delete a room (by id)
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM Rooms WHERE room_id = ?`;
    db.run(query, [req.params.id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            res.json({ message: 'Room deleted successfully' });
        }
    });
});

// promote user to admin in a specific room
router.put('/:room_id/promote/:user_id', (req, res) => {
    const query = `UPDATE User_Rooms SET role = 'admin' WHERE room_id = ? AND user_id = ?`;
    db.run(query, [req.params.room_id, req.params.user_id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User or room not found' });
        } else {
            res.json({ message: 'User promoted to admin successfully' });
        }
    });
});

// view all users in specific room + their roles
router.get('/:room_id/users', (req, res) => {
    const query = `
        SELECT u.username, ur.role
        FROM User_Rooms ur
        JOIN Users u ON ur.user_id = u.user_id
        WHERE ur.room_id = ?
    `;
    db.all(query, [req.params.room_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;