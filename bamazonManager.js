// Required NPM 
// ================================================
var inqirer = require("inquirer");
var mysql = require("mysql");





// Establish Connection To MySQL Database
// ================================================

// Connection Variable
//______________________________________
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  
    password: "4tigres", // Remove password before pushing to GitHub
    database: "bamazon_DB"
});


// Call Functions Upon Connecting
//______________________________________
connection.connect(function(err, res) {
    if (err) throw err;
    password();
});



// Variables
// ================================================
let pass = 5;
let tooLow = false;
var lowQuantityArray = [];





// Starting Functions
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
            console.log("Too many login attempts. Goodbye Los er\n");
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
                'Exit'
            ]
        }
    ]).then(function(response) {
        console.log(response.dashboard);
        switch (response.dashboard) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            case 'Exit':
                console.log("Bye Then...");
                process.exit();
                break;

            default:
                console.log("Switchcase error, man. Nothing selected")
        }
    })
};


//
////
//////
////////
        //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let 
        //   the manager "add more" of any item currently in the store.


        //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
////////
//////
////
//



// Functional Functions
// ================================================

// View Products Function
//______________________________________
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        console.log("Items On Sale...")
        console.log("----------------------------------------------" + "\n");
        for (var i = 0; i < response.length; i++) {
            console.log("Item: " + response[i].product_name);
            console.log("Quantity In Stock: " + response[i].stock_quantity);
            console.log("Item Price: $" + response[i].price);
            console.log("Item ID #: " + response[i].item_id);
            console.log("===============" + "\n")
        }
        console.log("----------------------------------------------" + "\n");
        console.log("What do you want to do next?\n");
        dashBoard();
    })
};



// View Low Inventory Function
//______________________________________
function lowInventory() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;

        console.log("----------------------------------------------" + "\n");
        for (var i = 0; i < response.length; i++) {
            if (response[i].stock_quantity < 5) {
                tooLow = true;
                lowQuantityArray.push(response[i]);
            }
        }

        if (tooLow === true) {
            console.log("The following items have less than 5 units left in stock.\n");
            console.log(lowQuantityArray);
        } else if (tooLow === false) {
            console.log("You have no items with less than 5 units left in stock.\n");
        }
        
        console.log("----------------------------------------------" + "\n");
        console.log("What do you want to do next?\n");
        dashBoard();
})
};


// Add To Inventory Function
//______________________________________
function addToInventory() {
    inquirer.prompt([
        {
            name: "item_to_buy",
            message: "Which item are you stocking up on? Enter an item number."
        }, {
            name: "number_to_add",
            message: "How many more are you adding?"
        }
    ]).then(function(response) {
        // Keep Coding Here
    })
};


// Add New Product Function
//______________________________________
function addNewProduct() {
    console.log("Add New Product Function Works");
    // Code Here
};