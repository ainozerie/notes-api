const mongoose = require('mongoose');

const schema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'new'
    }
});

module.exports = mongoose.model('Note', schema);