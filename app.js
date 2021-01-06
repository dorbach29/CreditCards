const express = require('express');
const chalk = require ("chalk");
const dotenv = require ("dotenv").config();
const path = require("path");

const cards = require("./routes/cards");
 
const app = express();
const port = process.env.PORT;


//Routing for homepage
app.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

//Routing for card searches
app.use('/cards', cards);

//Giving public access to css and js files
app.use(express.static('public'));


//Starting upp App
app.listen(port , () => {
    console.log(`App running and listening on port ${chalk.green(port)} `);
});
