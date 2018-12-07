// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

// ================================================
// Required NPM 
var mysql = require("mysql");
var inquirer = require("inquirer");





// ================================================
//Establish Connection To MySQL Database

//--------------------------------------
//Connection Variable
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  
    password: "", // Remove password before pushing to GitHub
    database: "bamazon_DB"
});

//--------------------------------------
// Call Functions Upon Connecting
connection.connect(function(err, res) {
    if (err) throw err;
    // console.log(res);
    // Cue Functions
    queryProducts();
})





// ================================================
// Global Variables

var prodctsArray = [];






// ================================================
// Functions

//--------------------------------------
// Constructing Product
function productsOnSale() {
    this.item,
    this.quantity,
    this.price
};


//--------------------------------------
// Display Product Query
function queryProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Items On Sale...")
        console.log("----------------------------------------------" + "\n");
        for (i = 0; i < res.length; i++) {
        console.log("Item: " + res[i].product_name);
        console.log("Item ID #: " + res[i].item_id);
        console.log("Item Price: $" + res[i].price);
        console.log("===============" + "\n")
        }
        console.log("----------------------------------------------" + "\n");
        // Cue More Functions
        customerPurchase();
    //   connection.end();
    })
};

//--------------------------------------
// Inquires Customers On What They Want
function customerPurchase() {
    inquirer.prompt([
        {
            name: "want_to_buy",
            message: "What is the Item ID of the product you want to buy?",
        },{
            name: "number_to_buy",
            message: "How many do you want to buy?"
        }
    ]).then(function(response) {
        var itemNumber = response.want_to_buy;
        var itemQuantity = response.number_to_buy;
        quantityChecker(itemNumber, itemQuantity);
    })
}


//--------------------------------------
// Quantity Checking Function
function quantityChecker(item, quantity) {
    if 
}