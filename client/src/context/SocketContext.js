import { createContext } from 'react';
import io from 'socket.io-client';

const getSocket = () => {
    const token = localStorage.getItem('auth-token');

    try {
        const socket = io.connect('http://localhost:5000/', {
            query: 'token=' + token,
        });
        socket.on('uservoted', ({ pollId }) => {
           console.log(pollId)
        });
        return socket
    } catch (err) {
        console.log(err);
    }
};

export const socket = getSocket();

export const SocketContext = createContext({ socket: getSocket() });