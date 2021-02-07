import { createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const getSocket = () => {
    const token = localStorage.getItem('auth-token');

    try {
        return io.connect('http://localhost:5000/', {
            query: 'token=' + token,
        });
    } catch (err) {
        console.log(err);
    }
};

export const socket = getSocket();