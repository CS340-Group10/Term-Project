var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_yamashch',
    password        : '0703',
    database        : 'cs340_yamashch'
}); 


// Testing the connection
pool.getConnection(function(err, connection) {
	if (err) {
		console.error('Error connecting to database');
		throw err;
	} else {
		console.log("connected to database.");
	}
});
module.exports.pool = pool;
