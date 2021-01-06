const express = require('express');
const chk = require('chalk')

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(`cards.js : ${chk.gray("GET /cards")} for ${req.query.CardName}`);
    res.send("Recived your request!")
})

module.exports = router; 