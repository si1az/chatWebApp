const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
        });

        socket.on('sendMessage', ({ roomId, userId, content }) => {
            io.to(roomId).emit('receiveMessage', {
                userId,
                content,
                timestamp: new Date(),
            });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initSocket,
    getIo,
};