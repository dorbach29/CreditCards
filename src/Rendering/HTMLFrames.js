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

module.exports = HTMLFrames; 