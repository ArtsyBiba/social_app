const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    friendlist: { type: String, required: true },
    imageOneUrl: { type: String, required: true },
    imageOneVotes: { type: Number },
    votedForImageOne: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    imageTwoUrl: { type: String, required: true },
    imageTwoVotes: { type: Number },
    votedForImageTwo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    userId: { type: String, required: true },
    author: { type: String, required: true },
});

module.exports = Poll = mongoose.model('poll', pollSchema);