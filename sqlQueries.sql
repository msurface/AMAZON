CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    stock_quantity INTEGER(15) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Can of Farts", "MISC", 15, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nikes", "Shoes", 250, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Clothes", 19.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Pants", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drugs", "Pharmacy", 100, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hats", "Accesories", 65.25, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 400, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookies", "Food", 2.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coke", "Food", 1.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone", "Electronics", 1000.99, 12);

UPDATE products SET stock_quantity = ? WHERE id = ?

SELECT price FROM products WHERE id = ?

SELECT stock_quantity FROM products WHERE id = ?