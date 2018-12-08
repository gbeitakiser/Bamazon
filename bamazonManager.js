// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.






// Required NPM 
// ================================================
var inqirer = require("inquirer");
var mysql = require("mysql");




// Variables
// ================================================
let pass = 5;





// Functions
// ================================================

// Manager Login Function
//______________________________________
function password() {
    inqirer.prompt([
        {
            type: "password",
            message: "Enter your password",
            name: "password",
            mask: "*",
    
        }
    ]).then(function(response) {
        if (response.password === "this1") {
            dashBoard();
        } else if (pass > 0) {
            pass--;
            console.log("Wrong Password. Try again.\n");
            password();
        } else {
            console.log("Too many login attempts. Goodbye Loser\n");
        }  
    })    
};



// Dashboard Display And Inquire Function
//______________________________________
function dashBoard() {
    inqirer.prompt([
        {
            type: "list",
            name: "dashboard",
            message: "Welcome to the Manager Dashboard. Choose What you'd like to do below.",
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Log Out'
            ]
        }
    ]).then(function(response) {
        // Code here
    })
}







//Establish Connection To MySQL Database
// ================================================

//Connection Variable
//______________________________________

password();