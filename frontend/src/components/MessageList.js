import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const MessageList = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        // Fetch initial messages for the room
        const fetchMessages = async () => {
            const response = await fetch(`/api/messages/${roomId}`);
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();

        // Listen for new messages
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [roomId, socket]);

    return (
        <div className="message-list">
            {messages.map((message) => (
                <div key={message.message_id} className="message">
                    <strong>{message.username}:</strong> {message.content}
                    <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;