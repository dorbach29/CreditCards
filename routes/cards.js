const express = require('express');
const chk = require('chalk')
const path = require("path");
const DataBus = require("./../DBH/GetData");
const {createPage} = require('./SSR');

const router = express.Router();


//For base get requests

router.get('/', async (req, res, next) => {
    try  { 
        console.log(`cards.js : ${chk.gray("GET /cards")} for ${req.query.CardName}`);

        const data = await DataBus.getCards(req.query.CardName);
        res.send(createPage(data));

    } catch (err) {
        console.log(chk.red(`cards.js: `) + err);
        throw err;
    }
})


//For gets for a specific Cards 

router.get('/:CardName', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/../views/card.html'))
}) 

module.exports = router; 