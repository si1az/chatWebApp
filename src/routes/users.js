const express = require('express');
const db = require('../db');
const router = express.Router();

// defines the routes for user related operations

// create new user
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

// fetch ALL users
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

// fetch a specific user by id
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM Users WHERE user_id = ?`;
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(row);
        }
    });
});

// update user's email or pass
router.put('/:id', (req, res) => {
    const { email, password_hash } = req.body;
    const query = `UPDATE Users SET email = ?, password_hash = ? WHERE user_id = ?`;
    db.run(query, [email, password_hash, req.params.id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
});

// delete a user (ban)
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM Users WHERE user_id = ?`;
    db.run(query, [req.params.id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});

// Count messages per user
router.get('/message-count', (req, res) => {
    const query = `
        SELECT u.username, COUNT(m.message_id) AS message_count
        FROM Users u
        LEFT JOIN Messages m ON u.user_id = m.user_id
        GROUP BY u.username
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