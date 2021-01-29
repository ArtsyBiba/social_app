const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    displayName: { type: String },
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'poll' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    friendsLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'friendsList' }],
});

module.exports = User = mongoose.model('user', userSchema);