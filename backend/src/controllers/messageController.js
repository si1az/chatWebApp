const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

// Send a message to a specific room
exports.sendMessage = async (req, res) => {
    const { roomId, content } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

    try {
        const message = await Message.create({
            room_id: roomId,
            user_id: userId,
            content: content,
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Retrieve messages from a specific room
exports.getMessages = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await Message.findAll({
            where: { room_id: roomId },
            include: [{ model: User, attributes: ['username'] }], // Include username in the response
            order: [['timestamp', 'ASC']],
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};