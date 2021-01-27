const chk = require('chalk');


const HTMLFrames = {
Cards : () => `
<html>
<head>
    <link href="css/index.css" type="text/css" rel="stylesheet"> 
    <script src="myScript.js"></script>
</head>
<body>
    <header>
        <div class='navbar-logo'>
            <a href='/'>
                <div id='MainLogo'> 
                    <img src="images/Logo.png" alt="CreditSurf Logo">
                </div>
            </a>
            <h2 class='sublogo' id='sublogo'>
                Save Money By Finding Your Credit Card's Car Rental Insurance Policy
            </h2>
        </div>
        

        <div class='navbar-search'>
            <h2 class='subtitle nav-subtitle'>New Search</h2> 
            <form action="/cards" method="GET" class='nav-search-form'> 
                <input type="text" name="CardName" id="Card-Search" class="SearchBar" required>
                <input type="submit" id="SubmitCardSearch" class="SubmitButton">  
            </form>
        </div>


    </header>
    <main>
        <ul id='MainCardList'>
            $%LIST%$
        </ul>
    </main>
    <footer>
        <p>Created by Daniel and Doron Orbach<p>
        <p> Contact: doronorbach@yahoo.com </p>
    </footer>
</body> 
</html>
`,

 CardListItemFrame : () => `
<li>
    <a class='card-list-element' href='/cards/CapitalOneSavorCard'> 
        <img src='images/cards/$%_id%$.png' alt="Capital One Savor Card">
        <div class="card-name">
            <h4>Card Name:</h4>
            <h6>$%CardName%$</h6>
        </div>
        <div class="card-bank">
            <h4>Bank:</h4>
            <h6>$%Bank%$</h6>
        </div>
        <div class="card-network">
            <h4>Credit Network:</h4>
            <h6>$%CreditNetwork%$</h6>
        </div>
        <div class="card-insurance">
            <h4>Insurance Provided:</h4>
            <h6>$%CoverageType%$</h6>
        </div>
    </a>
</li>
`
}

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