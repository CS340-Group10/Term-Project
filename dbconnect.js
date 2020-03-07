var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_lindorg',
    password        :  '0983',
    database        :  'cs340_lindorg'
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
