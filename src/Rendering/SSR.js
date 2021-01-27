const chk = require('chalk');
const HTMLFrames = require('./HTMLFrames.js');

//Program works as follows :
    //Runs through each Document it recives as data
    //For each header in the recived Data (headers in HTML are exact same as the headers in mongo), we attempt to insert into it's frame
    //Appends All List frames together
    //Inserts List Frame to mainpage
    //In html string we are replacing attributes between $% %$


// BuilderFunctions create a html item as required. Some use HTML frames and fill them out others do not. All Require 
// either an array of Documents, or a single document of data. 


const builderFunctions = {
    //Datatype required: Array of Documents
    Card : () => null,

    //Creates the /Cards html Page given a range of data
    //Datatype required: Single Full Document
    Cards : function(DocArray) {
        
        try { 

            const CardsFrame = HTMLFrames.Cards();
            const CardList = this.CardList(DocArray);
            const finalPage = CardsFrame.replace("$%LIST%$", CardList);

            return finalPage;

        } catch(err) {
            console.log(chk.red('SSR.js: Error Creating Cards'))
            throw err;
        }


    },

    //Creates A List Of Cards given an Array of Documents
    CardList : function(DocArray){
        try {


            let HTML ='';
            for(let index in DocArray){
                const ListItem = this.CardListItem(DocArray[index]);
                HTML += ListItem;
            }

            if(HTML === '') console.log(chk.bgRed('SSR.JS Warning CardList not filled'))
            return HTML;
        } catch(err) {
            throw err;
        }
    },


    
    //Creates a CardListItem given a Document with the CardName, Bank, CardType, and CoverageType
    CardListItem : function(document){
        try {

            let itemFrame = HTMLFrames.CardListItemFrame();
            for(let header in document){
                
                const ReplaceValue = `$%${header}%$`;
                itemFrame = itemFrame.replace(ReplaceValue, `${document[header]}`);
            }

            return itemFrame;
        } catch (err) {
            console.log(chk.bgRed("SSR.JS: Warning a ListItem was not created"));
            console.log(err);
            return '';
        }
    },


}

function createPage(pageName, data){

    //Creating HTML FRAME
    try {
    const page = builderFunctions[pageName](data);

    //Make Sure FinalPage is Renderd Correctly
    const errorRegex = new RegExp(/\$%\w*%\$/);
    if(page.match(errorRegex) !== null){
        console.log(chk.bgRed("SSR.js: WARNING Was not able to properly render page"));
    }

    return page;

    } catch (err){
        console.log(chk.bgRed(`SSR.js: ${err}`));
        throw "Unable To Render Page";
    }

}

module.exports = {
    createPage
}