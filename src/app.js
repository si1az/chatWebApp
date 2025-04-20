const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const roomsRoutes = require('./routes/rooms');
const messagesRoutes = require('./routes/messages');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/rooms', roomsRoutes);
app.use('/messages', messagesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});