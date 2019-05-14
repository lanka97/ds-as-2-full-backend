const express = require("express");
const router = express.Router();
const Card = require("../models/cardModel");
const bcrypt = require('bcrypt');


//method to add card to the database
Card.addCard = function addCard(req, res) {

    //encrypting CVC
    bcrypt.hash(req.body.cvc, 10, function (err, hash) {

        const cardobj = new Card({
            holder: req.body.holder,
            cardNum: req.body.cardNum,
            cvc: hash,
            exp: req.body.exp
        });
        Card.findOne({
            cardNum: req.body.cardNum   //make sure card number does not already exist
        }).then(card => {
            if (!card) {
                cardobj.save().then(Response => {
                    res.status(200).json({
                        message: "Card Registerd"
                    });
                }).catch(err => {
                    res.status(500).json({ message: err });
                })
            } else {
                res.status(200).json({
                    message: "Card Number Already exist"
                });
            }
        }).catch(err => {
            res.status(500).json({ err });
        });

    });
}

// method to validate cara numbers

Card.check = function check(req, res) {
    Card.findOne({
        cardNum: req.params.cardNum //get card number from req parameters and check
    })
        .then(card => {
            if (card) {
                if (bcrypt.compareSync(req.params.cvc, card.cvc)) {    ////get card CVC from req parameters and dycrypt it
                    res.status(200).json({ success: true, card });
                } else {
                    res.status(200).json({ success: false, error: "Invalid detail" });
                }
            } else {
                res.status(200).json({ success: false, error: "Invalid detail" });
            }
        })
        .catch(err => {
            res.send(err);
        })
}

module.exports = Card;
