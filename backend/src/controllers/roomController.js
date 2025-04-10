const Room = require('../models/Room');
const UserRoom = require('../models/UserRoom');

// Create a new chat room
exports.createRoom = async (req, res) => {
    const { roomName, description } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const newRoom = await Room.create({
            room_name: roomName,
            created_by: userId,
            description: description || null,
        });

        // Add the creator to the User_Rooms table
        await UserRoom.create({
            user_id: userId,
            room_id: newRoom.room_id,
            role: 'admin',
        });

        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: 'Error creating room', error: error.message });
    }
};

// Get all chat rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rooms', error: error.message });
    }
};

// Get a specific chat room by ID
exports.getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving room', error: error.message });
    }
};