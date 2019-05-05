const expess = require('express');
const app = expess();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Card = require("./routes/CardRoute");
const Transactions = require("./routes/TransactionRoute")

const mongoose = require("mongoose");



mongoose.connect('mongodb+srv://train1:'+ process.env.PASSWORD +'@cluster0-cx6ll.mongodb.net/bank?retryWrites=true',
{
    useNewUrlParser: true
}
    
).then(()=>{
    console.log("Mongo Atles connected");
}).catch(err=>{
    console.log('Mongo Error');
    console.log(err);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

app.use(( req, res, next ) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if( req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*'); 
        return res.status(200).json({}); 
    }

    next();
});

app.use('/card', Card );
app.use('/transactions', Transactions );

app.use( ( req,res, next ) => {
    const error = new Error( 'not found' );
    error.status =404;
    next(error);
});

app.use( (error, req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
        message : error.message
    }
    });
});

module.exports = app;