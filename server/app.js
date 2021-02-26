const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// set up express
const app = express();
app.use(cors());

// set up configuration for uploading files
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const PORT = process.env.PORT || 5000;

// set up mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
}, 
(err) => {
  if (err) throw err;
  console.log('MongoDB connection established');
});

// set up routes
app.use('/users', require('./routes/userRouter'));
app.use('/polls', require('./routes/pollRouter'));
app.use('/friends', require('./routes/friendRouter'));
app.use('/friendsList', require('./routes/friendsListRouter'));

const server = app.listen(PORT, () => console.log(`the server has started on port: ${PORT}`));

// set up socket
const io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.use((socket, next) => {
  try {
    const { token } = socket.handshake.query;
    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No authentication token, authorization denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
        return res
            .status(401)
            .json({ msg: 'Token verification failed, authorization denied' });
    }

    next();
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // listeners
  socket.on('user-add-vote', (data) => {
    socket.broadcast.emit('uservoted', { data });
  });

  socket.on('user-remove-vote', () => {
    socket.broadcast.emit('userunvoted');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

