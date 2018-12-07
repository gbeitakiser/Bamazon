
// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.



// Required NPM 
// ================================================
var mysql = require("mysql");
var inquirer = require("inquirer");
// ================================================




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
    // console.log(res);
    // Cue Functions
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
            // i = new productsOnSale(res[i].item_id, res[i].product_name, res[i].stock_quantity, res[i].price)
            productsArray.push(response[i])
            console.log("Item: " + response[i].product_name);
            console.log("Item ID #: " + response[i].item_id);
            console.log("Item Price: $" + response[i].price);
            console.log("===============" + "\n")
        }
        // console.log(productsArray);
        console.log("----------------------------------------------" + "\n");
        // Cue Functions
        customerPurchase();
    //   connection.end();
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

    } else {
        console.log("Insufficent Quantity!" + "\n" + "Order again....");
        customerPurchase();
    }
}




//   connection.end();