// require express
var express = require('express');
// require router
var router = express.Router();
// require burger
var burger = require('../models/burger.js');
// set up our routes

// Get request
router.get('/', function(req, res) {
	// select all burgers and load them
	burger.selectAll(function(data) {
		// create object ot hold data
		var hbsObject = {
			burgers: data
		};
		// use that data in the params of our get request (the remaining params left blank from the burger .js model)
		res.render('index', hbsObject);
	});
});

// post request
router.post('/', function(req, res) {
	// add the burger from out add burger section to the file
	burger.insertOne(req.body.burgerName, function() {
		res.redirect('/');
	});
});
// put request
router.put('/api/burger/:id', function(req, res) {
	// create condition variable
	var condition = 'id = ' + req.params.id;
	// change a burger from not eaten to eaten
	burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
		if (result.changedRows === 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});
module.exports = router;
