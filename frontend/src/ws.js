import React, { createContext, useEffect, useState } from 'react';

// Create a WebSocket context
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket =  new WebSocket("http://localhost:8080");

        socket.onopen = () => {
            console.log('Connected to WebSocket server');

            const subscribeMessage = JSON.stringify({
                type: 'subscribe',
                userId: process.env.REACT_APP_USERID,
            });
            socket.send(subscribeMessage);
        };

        socket.onmessage = (event) => {
            setData(event.data); 
        };

        setWs(socket);
    }, []); 
    return (
        <WebSocketContext.Provider value={{ ws, data }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use WebSocket data
export const useWebSocket = () => React.useContext(WebSocketContext);
