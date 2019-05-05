const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactions =  new Schema({
    number:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('transactions',transactions);