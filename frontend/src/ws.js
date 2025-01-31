import { useState, useEffect } from 'react';

export const useWebSocket = (userId) => {
    const [ws, setWs] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!userId || ws) return; 

        const socket = new WebSocket("wss://discord-ws.cycloneaddons.hackclub.app");

        socket.onopen = () => {
            console.log('Connected to WebSocket server');

            const subscribeMessage = JSON.stringify({
                type: 'subscribe',
                userId,
            });
            socket.send(subscribeMessage);
        };

        socket.onmessage = (event) => {
            setData(event.data);
        };

        setWs(socket);

    }, [userId, ws]);

    return { ws, data };
};
