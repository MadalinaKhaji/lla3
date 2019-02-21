let mongoose = require('mongoose');

let WordSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    translation: String,
    category: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Word', WordSchema);