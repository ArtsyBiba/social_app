import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
};

export function SocketProvider ({ token, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(
            'http//localhost:5000/',
            { query: { token } }
        )
        setSocket(newSocket);

        return () => newSocket.close();
    }, [token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}