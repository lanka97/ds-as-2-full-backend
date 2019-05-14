const express = require("express");
const Phone = require("../models/phoneModel");
const bcrypt = require('bcrypt');

//add phone number with pin to th system
Phone.addPhone = function addPhone(req, res) {

    //encryping pin number
    bcrypt.hash(req.body.pin, 10, function (err, hash) {

        const phoneobj = new Phone({
            number: req.body.number,
            pin: hash,
        });

        Phone.findOne({
            number: req.body.number //make sure phone number does not existing
        }).then(phone => {
            if (!phone) {
                phoneobj.save().then(Response => {
                    res.status(200).json({
                        message: "Phone Number Registerd"
                    });
                }).catch(err => {
                    res.status(500).json({ message: err });
                })
            } else {
                res.status(200).json({
                    message: "Phone Number Already exist"
                });
            }
        }).catch(err => {
            res.status(500).json({ err });
        });

    });
}

//check user enterd right phone number and pin
Phone.check = function check(req, res) {

    Phone.findOne({
        number: req.params.number,
    })
        .then(phone => {

            if (phone) {
                if (bcrypt.compareSync(req.params.pin, phone.pin)) {
                    res.status(200).json({ success: true, phone: phone });
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

module.exports = Phone;
