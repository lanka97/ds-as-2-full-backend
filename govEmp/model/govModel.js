const mongoose = require('mongoose');
const schema = mongoose.Schema;

const govEmp = new schema({
    empName:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('govEmp',govEmp);