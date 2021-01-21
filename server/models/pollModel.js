const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    friendlist: { type: String, required: true },
    imageOneUrl: { type: String },
    imageTwoUrl: { type: String },
});

module.exports = Poll = mongoose.model('poll', pollSchema);