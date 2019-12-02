//importing the ORM so we can query the burger_db database
var orm = require('../config/orm.js');

// burger object pulls in the orm functions
// here we put in the call back function parameter values from the original orm file
// we "fill in" the majority of the parameters in this file.
// the rest of the params will be given to the function in the burger controller file
var burger = {
	// select all
	selectAll: function(cb) {
		orm.selectAll(function(res) {
			cb(res);
		});
	},
	// insert 1
	insertOne: function(burger, cb) {
		orm.insertOne(burger, function(res) {
			cb(res);
		});
	},
	// update 1
	updateOne: function(objColVals, condition, cb) {
		orm.updateOne('burger', objColVals, condition, function(res) {
			cb(res);
		});
	}
};

// export burger
module.exports = burger;
