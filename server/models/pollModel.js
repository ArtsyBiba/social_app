const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    friendlist: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = Poll = mongoose.model('poll', pollSchema);