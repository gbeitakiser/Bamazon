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
  
    password: "", // Remove password before pushing to GitHub
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

// Password Guesses
//______________________
let pass = 5;


// Low Quantity Function
//______________________
let tooLow = false;
var lowQuantityArray = [];


// Restock Function
//______________________
var itemToAddCurrentQuantity = 0;
var newTotal = 0;






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
            pass = 5;
            console.log("\nWelcome to the Manager Dashboard\n")
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
            message: "Choose What you'd like to do below.",
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ]
        }
    ]).then(function(response) {
        switch (response.dashboard) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                toInventoryAsk();
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
    lowQuantityArray = [];
    tooLow = false;
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


// All Add To Inventory Functions
// ==============================

// Add To Inventory Ask Function
//______________________________________
function toInventoryAsk() {
    inqirer.prompt([
        {
            name: "item_to_add",
            message: "Which item are you stocking up on? Enter an item number:"
        }, {
            name: "number_to_add",
            message: "How many more are you adding?"
        }
    ]).then(function(response) {
        tallyInventory(response.item_to_add, response.number_to_add);
    });   
};   


// Add To Inventory Tally Function
//______________________________________
function tallyInventory(itemToAdd, quantityToAdd) {
    itemToAddCurrentQuantity = 0;
    newTotal = 0;
    var toSearch = itemToAdd - 1;

    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        itemToAddCurrentQuantity = response[toSearch].stock_quantity;
        newTotal = itemToAddCurrentQuantity + quantityToAdd;
        addToInventory(itemToAdd);
    })
}


// Add To Inventory Tally Function
//______________________________________
function addToInventory(ToAdd) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newTotal
          },
          {
            item_id: ToAdd
          }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("Product updated!\n");
            console.log("----------------------------------------------" + "\n");
            console.log("What do you want to do next?\n");
            dashBoard();
        }
    );
}
// ==============================





// Add New Product Function
//______________________________________
function addNewProduct() {
    inqirer.prompt([
        {
            name: "product_name",
            message: "What is the name of the new product?"
        }, {
            name: "product_department",
            message: "Which department does this product go into?"
        }, {
            name: "product_price",
            message: "How much does each unit of this product cost?"
        }, {
            name: "product_quantity",
            message: "How many units of this product are being added?"
        }
    ]).then(function(response) {
        console.log("Inserting a new product...\n");
        connection.query(
            "INSERT INTO products SET ?",
            {
            product_name: response.product_name,
            department_name: response.product_department,
            price: response.product_price,
            stock_quantity: response.product_quantity
            },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            console.log("----------------------------------------------" + "\n");
            console.log("What do you want to do next?\n");
            dashBoard();
        }
    );
    })
};