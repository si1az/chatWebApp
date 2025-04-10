import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (roomId) => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:5000'); // Adjust the URL as needed

        socketRef.current.emit('joinRoom', roomId);

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message) => {
        socketRef.current.emit('sendMessage', message);
    };

    const onMessageReceived = (callback) => {
        socketRef.current.on('message', callback);
    };

    return { sendMessage, onMessageReceived };
};

export default useSocket;