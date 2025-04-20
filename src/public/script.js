// Handle form submission to send a message
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

// Fetch and display messages
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