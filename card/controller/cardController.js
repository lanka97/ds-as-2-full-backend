const express = require("express");
const router = express.Router();
const Card = require("../models/cardModel");
const bcrypt = require('bcrypt');

Card.addCard  = function addCard( req, res ){

    bcrypt.hash(req.body.cvc, 10, function(err, hash) {        
    
    const cardobj = new Card({
        holder: req.body.holder,
        cardNum: req.body.cardNum,
        cvc: hash,
        exp: req.body.exp
    });
    Card.findOne({
        cardNum: req.body.cardNum
    }).then(card => {  
            if(!card){
                cardobj.save().then(Response => {
                    res.status(200).json({
                        message : "Card Registerd"
                    });
                }).catch( err => {
                    res.status(500).json({ message:err });
                })
            }else{
                res.status(200).json({
                    message : "Card Number Already exist"
                });
            }
    }).catch( err => {
        res.status(500).json({ err });
    });

});
}

Card.check = function check(req,res){
    console.log(req.params.cardNum);
    Card.findOne({
        cardNum: req.params.cardNum
    })
        .then(card=>{
            if(card){
                if(bcrypt.compareSync(req.params.cvc,card.cvc)){
                    res.status(200).json({success:true,card});
                }else{
                    res.status(200).json({success:false,error:"Invalid detail"});
                }
            }else{
                res.status(200).json({success:false,error:"Invalid detail"});
            }
        })
        .catch(err=>{
            res.send(err);
        })
}

module.exports = Card;
