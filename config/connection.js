//Set up MySQL connection
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 8080,
  host: "localhost",
  user: "root",
  password: "",
  database: "burger_db"
});

//Make connection, throw error if connection fails 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Exports connection for ORM to use 
module.exports = connection;
