// 4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

// 6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//    * Hint: You may need to look into aliases in MySQL.

//    * Hint: You may need to look into GROUP BYs.

//    * Hint: You may need to look into JOINS.

//    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)



// Required NPM 
// ================================================
var mysql = require("mysql");
var inquirer = require("inquirer");




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
let pass = 3;






// Starting Functions
// ================================================


// Manager Login Function
//______________________________________
function password() {
    inquirer.prompt([
        {
            type: "password",
            message: "Enter your password",
            name: "password",
            mask: "*",
    
        }
    ]).then(function(response) {
        if (response.password === "this1") {
            pass = 3;
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
    inquirer.prompt([
        {
            type: "list",
            name: "dashboard",
            message: "Choose What you'd like to do below.",
            choices: [
                'View Product Sales by Department',
                'Create New Department',
                'Exit'   
            ]
        }
    ]).then(function(response) {
        switch (response.dashboard) {
            case 'View Product Sales by Department':
                //viewProducts();
                break;
            case 'Create New Department':
                newDepartment();
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

// View Product Sales by Dept. Function
//______________________________________
function viewBySales() {
    // Code here
}




// Create New Dept. Function
//______________________________________
function newDepartment() {
    inquirer.prompt([
        {
            name: "department_to_add",
            message: "What is the name of the department you'd like to add?"
        }, {
            name: "overhead_costs",
            message: "Enter the number of overhead costs"
        }
    ]).then(function(answers) {
        var newDepartment = answers.department_to_add;
        var overheadCosts = answers.overhead_costs;
        connection.query(
            "INSERT INTO bamazon_departments SET ?",
            [
              {
                department_name : newDepartment
              },
              {
                over_head_costs: overheadCosts
              }, {
                product_sales: 0.00
              }
            ],
            function(err, res) {
                if (err) throw err;
                console.log("New Department Added!\n");
                console.log("----------------------------------------------" + "\n");
                console.log("What do you want to do next?\n");
                dashBoard();
            }
        );
    })
}