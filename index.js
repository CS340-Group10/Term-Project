const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('./dbconnect.js');
// setup body parser
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Set up handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false});


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

/*
// select query for reports page
app.get('/reports', function(req, res) {
	// sql query
//	var dml = 'SELECT team_name, revenue, city, state, sport FROM teams JOIN sports ' +
//			  'ON teams.team_id = sports.sport_id';
	mysql.pool.query('SELECT * FROM sports', function(error, results, fields) {
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
		console.log("Result of query: ");
		console.log(results);
		res.render('reports', {
			results: results
		});
	}); 
});
*/
// select query for reports page
app.get('/reports', function(req, res) {
	// sql query
/*	var dml = 'SELECT team_name, revenue, city, state, sport FROM teams JOIN sports ' +
			  'ON teams.team_id = sports.sport_id';
*/
	var context = {};
	mysql.pool.query('SELECT * FROM sports', function(error, results, fields) {
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
		console.log("Result of query: ");
		console.log(results);
		context.myResult = JSON.stringify(results)
		res.render('reports', context);
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