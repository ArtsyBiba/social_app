import { createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const getSocket = () => {
    const token = localStorage.getItem('auth-token');

    if (token) {
        return io.connect('http://localhost:5000/', {
            query: 'token=' + token,
        });
    }
    
    return io.connect('http://localhost:5000/');
};

export const socket = getSocket();