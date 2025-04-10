import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="room-list">
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.room_id}>
                        <Link to={`/rooms/${room.room_id}`}>
                            {room.room_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;