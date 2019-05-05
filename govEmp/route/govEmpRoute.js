const express = require("express");
const router = express.Router();

const govEmpService = require("../controller/govController");

router.get('/:nic', ( req, res) => {
    govEmpService.check( req, res );
});

router.post('/', ( req, res) => {
    govEmpService.add( req, res );
});

module.exports = router;