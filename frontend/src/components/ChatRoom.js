import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import MessageList from './MessageList';

const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = useSocket();

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leaveRoom', roomId);
            socket.off('message');
        };
    }, [roomId, socket]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('sendMessage', { content: newMessage, roomId });
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
            <h2>Chat Room</h2>
            <MessageList messages={messages} />
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;