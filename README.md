# Bamazon

### Challenge #1: Customer View

1. Created a MySQL Database called `bamazon`.

2.  Created a Table inside of that database called `products`.

3. The products table has  each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populated this database with more than 10 different products.

5. Created a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Includes the ids, names, and prices of products for sale.

6. The app then prompts users with two messages:

   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the customer has placed the order, the application then checks if the Bamazon store has enough of the product to meet the customer's request.

   * If not, the app logs a warning telling the customer there is not enough of the product in inventory to complete the transaction, prevents the order from going through, and then asks them to order again so they may order a lower number of the product.

8. However, if the store _does_ have enough of the product, the order is fulfilled.
   * As a result, the SQL database 'products' is updated to reflect the remaining quantity.
   * Once the update goes through,  the customer then sees the total cost of their purchase.


### Challenge #2: Manager View

* Created a new Node application called `bamazonManager.js`. Running this application will:

    * Cue up an Inquirer prompt asking for a password (so underlings can't go in and mess with things). The password is 'this1'. The user has five login attempts before the program shuts them out. 

    Then the program lists a set of menu options...

        * View Products for Sale
        
        * View Low Inventory
        
        * Add to Inventory
        
        * Add New Product

        * Exit

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, quantities, and how much revenue each product has earned thus far.

  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.

  * If a manager selects the 'Exit' option, the program stops running.


!!!    I have yet to complete challenge 3. Submitted the homework very early due to upcoming work trip, but will try to complete Challenge 3 before due date.   !!!

<!-- ### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table. -->