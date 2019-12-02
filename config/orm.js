// import my sql connection
var connection = require('../config/connection.js');

// function from cat activity that helps create sql statements
function objToSql(ob) {
	// empty array variable
	var arr = [];
	// loop through the keys in the object and push the key with its value value as a string arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if the string has spaces add quotes so the correct colum is being queried
			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
				value = "'" + value + "'";
			}
			// push to the array the key +=it's value
			arr.push(key + '=' + value);
		}
	}
	//return the array as a string
	return arr.toString();
}

// orm object
var orm = {
	// select all (queries all items in burger table )
	selectAll: function(cb) {
		// query string
		var queryString = 'SELECT * FROM burger';
		// connection param of query string and Cb function
		// query database
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	// add a burger
	insertOne: function(burger, cb) {
		// mysql query statement
		var queryString = 'INSERT INTO burger (burgerName, devoured) VALUES (?, false)';
		// connection params- statement, burger object, db function
		// query database
		connection.query(queryString, [ burger ], function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	// Switches my burgers from ready to eat to eaten
	updateOne: function(table, objColVals, condition, cb) {
		// query string update statement
		var queryString = 'UPDATE ' + table;
		// set new value
		queryString += ' SET ';
		// call object function from the beginning of orm doc
		queryString += objToSql(objColVals);
		// where
		queryString += ' WHERE ';
		// condition = ? (this will be my ID )
		queryString += condition;
		// connection params (mysql statement and cd function)
		// query database
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};

// export orm
module.exports = orm;
