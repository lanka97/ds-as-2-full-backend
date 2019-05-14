const express = require("express");
const router = express.Router();
const transactionsService = require("../controller/transactionConroller");

router.post('/', (req, res) => {
    transactionsService.addTransaction(req, res);
});


module.exports = router;