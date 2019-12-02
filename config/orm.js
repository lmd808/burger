// // Import MySQL connection.
// var connection = require('../config/connection.js');

// function printQuestionMarks(num) {
// 	var arr = [];

// 	for (var i = 0; i < num; i++) {
// 		arr.push('?');
// 	}

// 	return arr.toString();
// }

// // Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
// 	var arr = [];

// 	// loop through the keys and push the key/value as a string int arr
// 	for (var key in ob) {
// 		var value = ob[key];
// 		// check to skip hidden properties
// 		if (Object.hasOwnProperty.call(ob, key)) {
// 			// if string with spaces, add quotations
// 			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
// 				value = "'" + value + "'";
// 			}
// 			arr.push(key + '=' + value);
// 		}
// 	}

// 	// translate array of strings to a single comma-separated string
// 	return arr.toString();
// }

// // Object for all our SQL statement functions.
// var orm = {
// 	// select all
// 	all: function(tableInput, cb) {
// 		var queryString = 'SELECT * FROM ' + tableInput + ';';
// 		connection.query(queryString, function(err, result) {
// 			if (err) {
// 				throw err;
// 			}
// 			cb(result);
// 		});
// 	},
// 	// add new
// 	create: function(table, cols, vals, cb) {
// 		var queryString = 'INSERT INTO ' + table;

// 		queryString += ' (';
// 		queryString += cols.toString();
// 		queryString += ') ';
// 		queryString += 'VALUES (';
// 		queryString += printQuestionMarks(vals.length);
// 		queryString += ') ';

// 		console.log(queryString);

// 		connection.query(queryString, vals, function(err, result) {
// 			if (err) {
// 				throw err;
// 			}

// 			cb(result);
// 		});
// 	},
// 	// An update
// 	update: function(table, objColVals, condition, cb) {
// 		var queryString = 'UPDATE ' + table;

// 		queryString += ' SET ';
// 		queryString += objToSql(objColVals);
// 		queryString += ' WHERE ';
// 		queryString += condition;

// 		console.log(queryString);
// 		connection.query(queryString, function(err, result) {
// 			if (err) {
// 				throw err;
// 			}

// 			cb(result);
// 		});
// 	}
// };

// // Export the orm object for the model (burger.js).
// module.exports = orm;

var connection = require('../config/connection.js');

function objToSql(ob) {
	var arr = [];
	// loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
				value = "'" + value + "'";
			}
			// e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
			// e.g. {sleepy: true} => ["sleepy=true"]
			arr.push(key + '=' + value);
		}
	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
}
var orm = {
	selectAll: function(cb) {
		var queryString = 'SELECT * FROM burger';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	insertOne: function(burger, cb) {
		var queryString = 'INSERT INTO burger (burgerName, devoured) VALUES (?, false)';
		connection.query(queryString, [ burger ], function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// updateOne: function(id, cb) {
	// 	var queryString = 'UPDATE burger SET devoured=true WHERE id = ?';

	// 	connection.query(queryString, [ id ], function(err, result) {
	// 		if (err) {
	// 			throw err;
	// 		}
	// 		cb(result);
	// 	});
	// }
	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};

module.exports = orm;
