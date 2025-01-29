import { useState, useEffect } from 'react';

// Custom hook to manage WebSocket connection
export const useWebSocket = (userId) => {
    const [ws, setWs] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!userId || ws) return; // Ensure userId is provided and ws is not already established

        const socket = new WebSocket("wss://discord-realtime-profile.onrender.com"); // Correct WebSocket protocol

        socket.onopen = () => {
            console.log('Connected to WebSocket server');

            const subscribeMessage = JSON.stringify({
                type: 'subscribe',
                userId, // Use the userId passed as a prop
            });
            socket.send(subscribeMessage);
        };

        socket.onmessage = (event) => {
            setData(event.data);
        };

        setWs(socket);

    }, [userId, ws]); // Only run effect when userId or ws changes

    return { ws, data };
};
