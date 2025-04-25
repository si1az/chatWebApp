// =========================
// User Management
// =========================

// user registration done by admin/dev
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password_hash = document.getElementById('password').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password_hash })
    });

    if (response.ok) {
        alert('User registered!');
        document.getElementById('userForm').reset();
    } else {
        alert('Failed to register user.');
    }
});

// fetch + display users
document.getElementById('fetchUsers').addEventListener('click', async () => {
    const response = await fetch('/users');
    const users = await response.json();

    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = ''; // Clear previous users

    users.forEach((user) => {
        const div = document.createElement('div');
        div.className = 'user';
        div.innerHTML = `<strong>${user.username}</strong> (${user.email})`;
        usersDiv.appendChild(div);
    });
});

// ban user (delete user)
document.getElementById('banUser').addEventListener('click', async () => {
    const user_id = document.getElementById('userIdBan').value;

    const response = await fetch(`/users/${user_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('User banned successfully!');
    } else {
        alert('Failed to ban user.');
    }
});

// update user info
document.getElementById('updateUser').addEventListener('click', async (e) => {
    e.preventDefault();

    const user_id = document.getElementById('userIdUpdate').value;
    const email = document.getElementById('newEmail').value;
    const password_hash = document.getElementById('newPassword').value;

    const body = {};
    if (email) body.email = email;
    if (password_hash) body.password_hash = password_hash;

    const response = await fetch(`/users/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        alert('User updated successfully!');
    } else {
        alert('Failed to update user.');
    }
});

// =========================
// Room Management
// =========================

// register new room
document.getElementById('roomForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const room_name = document.getElementById('roomName').value;
    const created_by = document.getElementById('creatorId').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_name, created_by, description })
    });

    if (response.ok) {
        alert('Room registered!');
        document.getElementById('roomForm').reset();
    } else {
        alert('Failed to register room.');
    }
});

// fetch + display ALL rooms
document.getElementById('fetchRooms').addEventListener('click', async () => {
    const response = await fetch('/rooms');
    const rooms = await response.json();

    const roomsDiv = document.getElementById('rooms');
    roomsDiv.innerHTML = ''; // Clear previous rooms

    rooms.forEach((room) => {
        const div = document.createElement('div');
        div.className = 'room';
        div.innerHTML = `<strong>${room.room_name}</strong>: ${room.description}`;
        roomsDiv.appendChild(div);
    });
});

// delete a room
document.getElementById('deleteRoom').addEventListener('click', async () => {
    const room_id = document.getElementById('roomIdDelete').value;

    const response = await fetch(`/rooms/${room_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Room deleted successfully!');
    } else {
        alert('Failed to delete room.');
    }
});

// promote user to admin (specific to a room)
document.getElementById('promoteUser').addEventListener('click', async () => {
    const room_id = document.getElementById('roomIdPromote').value;
    const user_id = document.getElementById('userIdPromote').value;

    const response = await fetch(`/rooms/${room_id}/promote/${user_id}`, {
        method: 'PUT'
    });

    if (response.ok) {
        alert('User promoted to admin!');
    } else {
        alert('Failed to promote user.');
    }
});

// fetch + display users (in a specific room)
document.getElementById('fetchRoomUsers').addEventListener('click', async () => {
    const room_id = document.getElementById('roomIdUsers').value;

    const response = await fetch(`/rooms/${room_id}/users`);
    const users = await response.json();

    const roomUsersDiv = document.getElementById('roomUsers');
    roomUsersDiv.innerHTML = ''; // Clear previous users

    users.forEach((user) => {
        const div = document.createElement('div');
        div.className = 'user';
        div.innerHTML = `<strong>${user.username}</strong> (${user.role})`;
        roomUsersDiv.appendChild(div);
    });
});

// =========================
// Message Management
// =========================

// new message
document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const room_id = document.getElementById('room').value;
    const user_id = document.getElementById('user').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id, user_id, content })
    });

    if (response.ok) {
        alert('Message sent!');
        document.getElementById('messageForm').reset();
    } else {
        alert('Failed to send message.');
    }
});

// fetch + display all messages
document.getElementById('fetchMessages').addEventListener('click', async () => {
    const response = await fetch('/messages');
    const messages = await response.json();

    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear previous messages

    messages.forEach((msg) => {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `<strong>${msg.username} (Room: ${msg.room_name}):</strong> ${msg.content} <em>${msg.timestamp}</em>`;
        messagesDiv.appendChild(div);
    });
});

// fetch + display messages per room id
document.getElementById('fetchRoomMessages').addEventListener('click', async () => {
    const room_id = document.getElementById('roomIdView').value;

    const response = await fetch(`/messages/room/${room_id}`);
    const messages = await response.json();

    const roomMessagesDiv = document.getElementById('roomMessages');
    roomMessagesDiv.innerHTML = ''; // Clear previous messages

    messages.forEach((msg) => {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `<strong>${msg.username}:</strong> ${msg.content} <em>${msg.timestamp}</em>`;
        roomMessagesDiv.appendChild(div);
    });
});

// delete a message
document.getElementById('deleteMessage').addEventListener('click', async () => {
    const message_id = document.getElementById('messageIdDelete').value;

    const response = await fetch(`/messages/${message_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Message deleted successfully!');
    } else {
        alert('Failed to delete message.');
    }
});

// =========================
// Statistics
// =========================

/* 
// Count messages per user
document.getElementById('fetchMessageCounts').addEventListener('click', async () => {
    const response = await fetch('/users/message-count');
    const counts = await response.json();

    const messageCountsDiv = document.getElementById('messageCounts');
    messageCountsDiv.innerHTML = ''; // Clear previous counts

    counts.forEach((count) => {
        const div = document.createElement('div');
        div.className = 'count';
        div.innerHTML = `<strong>${count.username}:</strong> ${count.message_count} messages`;
        messageCountsDiv.appendChild(div);
    });
});
*/