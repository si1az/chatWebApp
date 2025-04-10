const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

// Route to send a message
router.post('/send', sendMessage);

// Route to get messages for a specific room
router.get('/:roomId', getMessages);

module.exports = router;