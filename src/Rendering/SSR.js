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
    //Datatype required: Complete Document
    Info : function(Document){
        try {

            let InfoFrame = HTMLFrames.Info(); //Getting the main HTML Frame
            
            const InfoHeader = this.InfoHeader(Document);
            InfoFrame = InfoFrame.replace('$%Header%$', InfoHeader);

            const InfoLimitations = this.InfoLimitations(Document);
            InfoFrame = InfoFrame.replace('$%Limitations%$', InfoLimitations);

            return InfoFrame;

        } catch (err) {
            console.log(chk.red(`SSR.js: Error building the info page`));
            throw err;
        }
    },

    InfoHeader : function(Document){

        let InfoHeaderFrame = HTMLFrames.InfoHeader();
        
        //Check that the Document includes the header then insert the info
        const HeadersRequired = ['CardName', 'CoverageType', 'CreditNetwork', 'Bank']
        HeadersRequired.forEach(header => {
            if (!Document.hasOwnProperty(header)) 
                throw `SSR.JS: Missing the ${header} property in data`;
            InfoHeaderFrame = InfoHeaderFrame.replace(`$%${header}%$`, Document[header]);

        })

        return InfoHeaderFrame; 

    },


    InfoLimitations : function(Document){
        
        let InfoLimitationsFrame = HTMLFrames.InfoLimitations();

        const HeadersRequired = ['TimeDomestic', 'TimeInternational', 'PriceLimit', ]; //Headers to be plugged in 
        const ArraysRequired = ['CountriesExcluded', 'CarsExcluded', 'CoverageLimit', 
                                'Steps', 'ClaimSteps', 'ClaimDocuments' ]; //Need to be turned into lists before getting inserted

        //Checking Document includes the required data then plugging it in 
        //(Either by creating a list or simply plugging it in)
        HeadersRequired.forEach(header => {
            if (!Document.hasOwnProperty(header)) 
                throw `SSR.JS: Missing the ${header} property in data`;
            InfoLimitationsFrame = InfoLimitationsFrame.replace(`$%${header}%$`, `${Document[header]}`);
        })

        ArraysRequired.forEach(header => {
            if (!Document.hasOwnProperty(header)) 
                throw `SSR.JS: Missing the ${header} property in data`;
            const InfoBasicList = this.InfoBasicList(Document[header]); //Creating a basic list using the array 
            InfoLimitationsFrame = InfoLimitationsFrame.replace(`$%${header}%$`, InfoBasicList);
        })

    },
    InfoBasicList : function(ValueArray){
        let InfoBasicList = '';
        ValueArray.forEach(Value => {
            InfoBasicList += `<li>${Value}</li>`;
        });
        return InfoBasicList;
    },

    //Creates the /Cards html Page given a range of data
    //Datatype required: Single Full Document
    Cards : function(DocArray) {
        
        try { 

            
            const CardsFrame = HTMLFrames.Cards(); //Creating the frame
            const CardList = this.CardList(DocArray); //Rendering the List
            const finalPage = CardsFrame.replace("$%LIST%$", CardList); //Completing the HTML file
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