const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_yamashch',
  password        : '0703',
  database        : 'cs340_yamashch'
});
module.exports.pool = pool;


const PORT = process.env.PORT || 5000;

// Set up handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// set up routes
// route for home page
app.get('/', function(req, res) {
	res.render('home', {
		title: "home page"
	});
});

// route for reports page
app.get('/reports', function(req, res) {
	res.render('reports', {
		title: "reports page"
	});
});


// route for charts page
app.get('/charts', function(req, res) {
	res.render('charts', {
		title: "charts page"
	});
});

// route for admin page
app.get('/admin', function(req, res) {
	res.render('admin', {
		title: "admin page"
	});
});


// This are routes for static html pages
app.use(express.static(path.join(__dirname, 'public')));


// listen on port
app.listen(PORT, () => console.log("Server Listening on port " + PORT));