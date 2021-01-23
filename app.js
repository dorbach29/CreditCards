const express = require('express');
const chalk = require ("chalk");
const dotenv = require ("dotenv").config();
const path = require("path");
const cards = require("./routes/cards");
const DataBus =  require("./DBH/GetData")
 
const app = express();
const port = process.env.PORT;

async function runApp() {

    try{

        //Setting up DB Connection
        await DataBus.openConnection();


        //Routing for homepage, Card Searches, Css/Image/JS files
        app.get( '/', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/index.html'));
        })
        app.use('/cards', cards);
        app.use(express.static('public'));

        //Starting upp App
        app.listen(port , () => {
            console.log(`App running and listening on port ${chalk.green(port)} `);
        });

    } catch (error){
        console.log(error) ;
    }



}

runApp();