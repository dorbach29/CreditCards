const express = require('express');
const chk = require('chalk')
const path = require("path");
const DataBus = require("../DBH/GetData");
const {createPage} = require('../Rendering/SSR');

const router = express.Router();


//For base get requests

router.get('/', async (req, res, next) => {
    try  { 
        console.log(`cards.js : ${chk.gray("GET /cards")} for ${req.query.CardName}`);

        const data = await DataBus.getCards(req.query.CardName);
        res.send(createPage('Cards', data));

    } catch (err) {
        console.log(chk.red(`cards.js: `) + err);
        res.send("Sorry we had an error getting your file :(")
    }
})


//For gets for a specific Cards 

router.get('/:CardName', async (req, res, next) => {
    try { 
        const CardID = req.params.CardName;
        const Card = await DataBus.getCardById(CardID);
        res.send(createPage('Info', Card));
    } catch (err) {
        console.log(err);
        res.send("Sorry we had an error fetching the card");
    }
}) 

module.exports = router; 