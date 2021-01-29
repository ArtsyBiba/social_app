const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// set up express
const app = express();
app.use(cors());

// set up configuration for uploading files
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`the server has started on port: ${PORT}`));

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
