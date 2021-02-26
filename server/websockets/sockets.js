const socket = require('socket.io');

io.on('connection', (socket) => {
    console.log('a user connected');
  
    // listeners
  
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
});