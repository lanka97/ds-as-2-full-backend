const express = require("express");
const Transaction = require("../models/transactionsModel");

Transaction.addTransaction  = function addTransaction( req, res ){

    const transactiondobj = new Transaction({
        amount: req.body.amount,
        number: req.body.number,
        date: req.body.date,
    });
    transactiondobj.save().then(Response => {
        res.status(200).json({
            message : "Transaction Registerd"
        });
        }).catch( err => {
            res.status(500).json({ message:err });
        })
}

module.exports = Transaction;