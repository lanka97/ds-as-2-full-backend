const express = require("express");
const router = express.Router();
const cardService = require("../controller/cardController");

router.post('/', ( req, res) => {
    cardService.addCard( req, res );
});

router.get('/:cvc/:cardNum', ( req, res) => {
    cardService.check( req, res );
});

module.exports = router;