const chk = require ("chalk");
const dotenv = require ("dotenv").config();
const path = require("path");
const {MongoClient} = require('mongodb');

let db;
let collection;


const DataBus = {

    //Open a connection to the database
    async openConnection(){
        
        const db_uri = process.env.DB_URI;
        const client = new MongoClient(db_uri);

        try {
            await client.connect();
            const database = client.db('sample_mflix');
            const collection = database.collection('movies');
            console.log(chk.green('GetData.js: Connected to DB successfully'));

        } catch (error) {
            console.log(chk.red(`GetData.js: Error connecting to DB`));
            throw error;
        }

    }

}


module.exports =  DataBus;