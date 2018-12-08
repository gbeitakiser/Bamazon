
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ninja Sword", "Ninja Supplies", 99.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pet Supplies", 24.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pet Supplies", 15.00, 212);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smoke Grenades", "Ninja Supplies", 30.00, 117);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gerbil Roller Ball", "Pet Supplies", 12.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nunchucks", "Ninja Supplies", 45.57, 83);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honda Accord", "Cars", 27945.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ferrari LaFerrari Aperta", "Cars", 2258689.99, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jaguar I-Pace", "Cars", 81234.99, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Geo Metro", "Used Cars", 1199.99, 12);


-- UPDATE products SET ? WHERE ?    SET is (thing to change) = (new value)   and WHERE is (id name for item) = (id number for item);