const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Create a new room
router.post('/', roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get a specific room by ID
router.get('/:id', roomController.getRoomById);

// Update a room by ID
router.put('/:id', roomController.updateRoom);

// Delete a room by ID
router.delete('/:id', roomController.deleteRoom);

module.exports = router;