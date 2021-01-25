const chk = require('chalk');

const createCardListFrame = () => `
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
`
const createItemFrame = () => `
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

//Program works as follows :
    //Runs through each Document it recives.
    //For each header (header regex are exact same as the headers in mongo) in the recived Data, we attempt to insert it to the list
    //Appends All List frames together
    //Inserts List Frame to mainpage
    //In html string we are replacing attributes between $% %$

//Array of ways to 
const getValueFunctions = [];

function createPage(data){

    //Creating HTML FRAME
    const htmlFrame = createCardListFrame();

    //Creating List
    let list = ''
    for(let i = 0; i < data.length; i ++){
        let itemFrame = createItemFrame();
        const document = data[i];
        for(const header in document){
            const searchValue = `$%${header}%$`;
            itemFrame = itemFrame.replace(searchValue, `${document[header]}`);
        }
        list += itemFrame;
    }

    const finalPage = htmlFrame.replace('$%LIST%$', list);

    //Make Sure FinalPage is Renderd Correctly
    const errorRegex = new RegExp(/\$%\w*%\$/);
    if(finalPage.match(errorRegex) !== null){
        console.log(chk.bgRed("SSR.js: WARNING Was not able to properly render page"));
    }

    return finalPage;

}

module.exports = {
    createPage
}