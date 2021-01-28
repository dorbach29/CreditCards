
/*Frames that render the different HTML elements used in the website
  Any Dynamic Componenets are a frame are labled as $% <LABEL> %$
  Components are Named as such : Page[Child1, Child2 , Child 3 ...]
  For Examples:
    Cards - main page
     CardsListItem - an item to be placed in CardsList to be placed in Cards

*/

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
    `,



    Info : () => `
    <html>
    <head>
        <link href="/../css/index.css" type="text/css" rel="stylesheet"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <header>
            <div class='navbar-logo'>
                <a href='/'>
                    <div id='MainLogo'> 
                        <img src="/../images/Logo.png" alt="CreditSurf Logo">
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


            $%Header%$
            
            $%Limitations%$

        


        </main>
        <footer>
            <p>Created by Daniel and Doron Orbach<p>
            <p> Contact: doronorbach@yahoo.com </p>
        </footer>
    </body> 
</html>
    `,

    InfoLimitations : () => `
    <div class='info-section'> 
            <h2 class='subtitle'>Limitations</h2>

            <div class='info-box'>
                <h3 class='label'>Longest Rental Period Allowed (Domestic):</h3>
                <h3>$%TimeDomestic%$</h3>
            </div>

            <div class='info-box'>
                <h3 class='label'>Longest Rental Period Allowed (International):</h3>
                <h3>$%TimeInternational%$</h3>
            </div>

            <div class='info-box'>
                <h3 class='label'>Value Limit For Rental Vehicle:</h3>
                <h3>$%PriceLimit%$</h3>
            </div> 

            <div class='info-box'>
                <h3 class='label'>Countries Where Insurance Is Not Offered:</h3>
                <ul class='basic-list'>
                    $%CountriesExcluded%$
                </ul>
            </div>
            
            <div class='info-box'>
                <h3 class='label'>Cars Exclued From Offer:</h3>
                <ul class='basic-list'>
                    $%CarsExcluded%$
                </ul>
            </div>

            <div class='info-box'>
                <h3 class='label'>Maximums Insurance Will Pay For</h3>
                <ul class='basic-list'>
                    $%CoverageLimit%$
                </ul>
            </div>
            
            <div class='info-box'>
                <h3 class='label'>How To Activate Insurance:</h3>
                <ol class='basic-list'>
                    $%Steps%$
                </ol>
            </div>

            <div class='info-box'>
                <h3 class='label'>Steps For Filing Claims (With Documents needed)</h3>
                <ul class='basic-list'>
                    $%ClaimSteps%$
                </ul>
                <h4 class='label'>Documents Needed:</h2>
                <ul class='basic-list'>
                    $%ClaimDocuments%$
                </ul>
            </div>
        </div>
    `,


    InfoHeader : () => `
    <img src='/images/cards/$%_id%$.png'>


    <h2>$%CardName%$</h2>
    <div>
        <h3 class='label'>Bank: </h3>
        <h3>$%BankName%$</h3>
        <h3 class='label'>Credit Network: </h3>
        <h3>$%CreditNetwork%$</h3>
    </div>

    <h3 class='label'>Car Rental Insurance Offered: </h3>
    <h3>$%CoverageType%$</h3>
    `

    }

module.exports = HTMLFrames; 