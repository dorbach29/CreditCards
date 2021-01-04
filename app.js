const express = require('express');
const chalk = require ("chalk");
const dotenv = require ("dotenv").config();
const path = require("path")
 
const app = express();
const port = process.env.PORT;


//Routing for homepage
app.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})


//Starting upp App
app.listen(port , () => {
    console.log(`App running and listening on port ${chalk.green(port)} `);
});
