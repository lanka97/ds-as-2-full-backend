const express = require("express");
const router = express.Router();
const PhoneService = require("../controller/phoneController");

router.post('/', ( req, res) => {
    PhoneService.addPhone( req, res );
});

router.get('/:number/:pin', ( req, res) => {
    PhoneService.check( req, res );
});

module.exports = router;