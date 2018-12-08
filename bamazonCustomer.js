// Required NPM 
// ================================================
var mysql = require("mysql");
var inquirer = require("inquirer");




//Establish Connection To MySQL Database
// ================================================

//Connection Variable
//______________________________________
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  
    password: "", // Remove password before pushing to GitHub
    database: "bamazon_DB"
});


// Call Functions Upon Connecting
//______________________________________
connection.connect(function(err, res) {
    if (err) throw err;
    queryProducts();
})





// Global Variables
// ================================================

var productsArray = [];





// Functions
// ================================================

// Display Product Query
//______________________________________
function queryProducts() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        console.log("Items On Sale...")
        console.log("----------------------------------------------" + "\n");
        for (var i = 0; i < response.length; i++) {
            productsArray.push(response[i])
            console.log("Item: " + response[i].product_name);
            console.log("Item ID #: " + response[i].item_id);
            console.log("Item Price: $" + response[i].price);
            console.log("===============" + "\n")
        }
        console.log("----------------------------------------------" + "\n");
        customerPurchase();
    })
};



// Inquires Customers On What They Want
//______________________________________
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



// Quantity Checking Function
//______________________________________
function quantityChecker(item, quantity) {
    var indexItem = item - 1;
    if (quantity <= productsArray[indexItem].stock_quantity) {
        sellProduct(item, quantity);
    } else {
        console.log("\n" + "Insufficent Quantity!" + "\n" + "Order again....");
        console.log("----------------------------------------------" + "\n");
        customerPurchase();
    }
}



// Sell Product Function
//______________________________________
function sellProduct(item, quantity) {
    var indexItem = item - 1;
    var productsLeft = productsArray[indexItem].stock_quantity - quantity;
    var sale = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: productsLeft
          },
          {
            item_id: item
          }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("\n" + res.affectedRows + " product(s) updated!\n");
            console.log("You bought " + quantity + " " + productsArray[indexItem].product_name + "(s)!\n");
            console.log("Your transaction cost $" + (productsArray[indexItem].price * quantity).toFixed(2) + "\n");
            console.log("----------------------------------------------" + "\n");
            // connection.end();
            // buySomethingElse();
        }
      );
    
}


function buySomethingElse() {
    inquirer.prompt([
        {
            // Ask if they want to buy more and if yes, list items again
        }
    ])
}