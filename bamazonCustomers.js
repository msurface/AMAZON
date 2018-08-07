var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "I8theapple!",
    database: "bamazon_DB"
});
//function to connect to our database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //calling the display items function
    displayAllItems();
});
//function to display all items stored in database
function displayAllItems() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        
        //make the table look pretty variable
        var divider = "\n-------------------\n";
        console.log(divider);
        console.log("Welcome to the store");
        console.log("Stuff you can buy:");
        console.log(divider);
        
        //for loop to display all the products by id, name, price
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + '. ' + res[i].product_name + '. ' + '$' + res[i].price + '.');

        }
        console.log(divider);
        sales();
    })
};

//validating inputs as an integer
function validateAnswer (value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a positve integer.';
    }
};

function sales() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to purchase an item?",
            name: "confirm",
            default: true
        }
    ]).then(function(firstAnswer) {
        if(firstAnswer.confirm) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "what number would you like to purchase?",
                    validate: validateAnswer
                },
                
                {
                    type: "input",
                    name: 'units',
                    message: "how many would you like to purchase?",
                    validate: validateAnswer
                }
            ]).then(function(secondAnswer){

                //variables to convert user answers into integers
                var userProduct = parseInt(secondAnswer.id);
                var userQuantity = parseInt(secondAnswer.units);
                //using console to show the answers exist
                //console.log(userProduct);
                //console.log(userQuantity);

                //function that matches id chosen to the item in the database
                function itemSelect() {
                    var divider = "\n--------------\n"
                    //setting up a SQL query
                    var sql = 'SELECT * FROM products WHERE id = ?';

                    //connecting to the database and getting the info needed
                    connection.query(sql, [userProduct], function(err, res) {
                        if (err) throw err;
                        //console.log(res);

                        var quantity = res[0].stock_quantity;
                        //console.log(quantity);

                        if (quantity > 0) {

                            //multiplication for the price
                            var cost = res[0].price * userQuantity;

                            console.log(divider);
                            console.log("ACCEPTED! You've been chared " + "$" + cost + " for " + userQuantity +" "+ res[0].product_name);
                            console.log(divider);

                            var updateStockDb = quantity -= userQuantity;

                            //function to update inventory in the database
                            function inventoryUpdate() {
                                
                                //sql query to update the database
                                var sql = 'UPDATE products SET stock_quantity = ? WHERE id = ?';

                                //connecting and update to the database
                                connection.query(sql, [updateStockDb, userProduct], function(err, res) {

                                    if (err) throw err;

                                })

                            };
                            inventoryUpdate();

                            inquirer.prompt([
                                {
                                    type: 'confirm',
                                    message: "Would you like to return to the store front?",
                                    name: "confirm"
                                }
                            ]).then(function(thirdAnswer) {
                                if (thirdAnswer.confirm) {
                                    
                                    //call function to return to the start of the program
                                    runbam();
                                } else {
                                    console.log(divider);
                                    console.log('Thanks for shopping!')
                                }
                            })

                        } else {

                            console.log("Sorry, we don't have that item in stock.");
                            runbam();
                        }
                    });
                };
                itemSelect();
            });
        }
    })
};

    //function to run the program in order
    function runbam() {
        sales();
    };


