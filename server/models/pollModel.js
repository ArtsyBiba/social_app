const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    friendlist: { type: String, required: true },
    imageOneUrl: { type: String, required: true },
    imageTwoUrl: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = Poll = mongoose.model('poll', pollSchema);