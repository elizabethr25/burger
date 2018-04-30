//Require express, create Router 
var app = require("express");
var router = app.Router();

//Import the model to use database functions 
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/index", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log("HBS:", hbsObject);
      res.render("index", hbsObject);
    });
});

router.post("/index", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, Boolean(req.body.devoured)
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/index", function(req, res){
	var condition = 'id = ' + req.params.id;

	console.log('condition ', condition);

	burgers.update({'devoured': req.body.devoured}, condition, function(data){
		res.redirect('/index');
	});
});

//Export router for server.js to use 
module.exports= router;
