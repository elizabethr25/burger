//Import MySQL connection
var connection = require("./connection.js");

//Allows multiple values to be passed in as a string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    // if (Object.hasOwnProperty.call(ob, key)) {
    //   // if string with spaces, add quotations
    //   if (typeof value === "string" && value.indexOf(" ") >= 0) {
    //     value = "'" + value + "'";
    //   }
      arr.push(key + "=" + value);
    }
  

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

//Create the ORM methods that will execute the mysql commands in the controllers; Object for all our SQL statement functions.
var orm = {
  //Selecting all burgers
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, res) {
      if (err) { 
        throw err;
      };
      cb(res);
    });
  },

  //Creating(inserting) a burger
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  //Updating(devouring) a burger
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

//Export ORM for burger.js model to use
module.exports = orm;
