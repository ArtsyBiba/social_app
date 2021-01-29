const mongoose = require('mongoose');

const friendsListSchema = new mongoose.Schema({
    listName: { type: String, required: true },
    friends: { type: Array, required: true },
    userId: { type: String, required: true },
});

module.exports = FriendsList = mongoose.model('friendsList', friendsListSchema);