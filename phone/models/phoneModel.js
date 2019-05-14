const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneNumbers = new Schema({
    number: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('PhoneNumbers', phoneNumbers);