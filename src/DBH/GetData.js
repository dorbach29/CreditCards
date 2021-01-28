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
            db = client.db(process.env.DB_NAME);
            collection = db.collection(process.env.DB_COLLECTION);
            console.log(chk.green('GetData.js: Connected to DB successfully'));

        } catch (error) {
            console.log(chk.red(`GetData.js: Error connecting to DB`));
            throw error;
        }

    },


    //Basic Search For Cards by the Card Name 
    //THERE MUST BE A TEXT INDEX IN THE MONGO DATABASE FOR THIS TO WORK
    async getCards(cardName){
        
        //Checking for valid connection
        if(!collection || !db){
            throw "No Connection To Database";
        }

        let result; 
        try {

            //Getting Data and Filtering For Nessecary Headers
            result = await collection.find(
                {'$text' : {'$search' : cardName}},
                {'projection' : {'CardName' : 1, 'CardType': 1, 'CreditNetwork' : 1, "Bank" : 1, "CoverageType" : 1}}    
            ).toArray();

        } catch (error) {
            console.log(chk.red(`GetData.js: ${error}`));
            result = 'Error';
        } finally {
            return (result);
        }


    },


    async getCardById(CardID){
        try {

            //Checking for valid connection
            if(!collection || !db){
                throw "No Connection To Database";
            }

            let result = await collection.findOne({'_id' : CardID})
            if(result){
                return result;
            }
            else throw "No Such Card";

        } catch (err) {
            console.log(chk.bgRed('SSR.js: getCardByID - error getting Data'));
            throw err; 
        }
    }

}


module.exports =  DataBus;