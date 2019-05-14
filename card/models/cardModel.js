const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const card = new Schema({
    holder: {
        type: String,
        required: true
    },
    cardNum: {
        type: String,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
    exp: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Card', card);