const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('./dbconnect.js');
// setup body parser
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5011;

// Set up handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set up sql

app.set('mysql', mysql);

// create application/x-www-form-urlencoded parser
////const urlencodedParser = bodyParser.urlencoded({ extended: false});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set up routes
// route for home page
app.get('/', function(req, res) {
	res.render('home', {
		title: "home page"
	});
});


// route for reports page
// select query for reports page
app.get('/reports', function(req, res) {
	var myQuery = 'SELECT team_name, active_salary_cap, city, state, sport_name FROM teams ' +
					'JOIN sports ON teams.sport = sports.sport_id';
	mysql.pool.query(myQuery, function(error, results, fields) {
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
		res.render('reports', {
			title: "reports page",
			results: results
		});
	});
});

// route for charts page
app.get('/charts', function(req, res) {
	res.render('charts', {
		title: "charts page"
	});
});

//route for admin page

app.use('/admin', require('./admin.js'));
app.use('/admin-teams', require('./admin-teams.js'));
app.use('/admin-injuries', require('./admin-injuries.js'));

// This are routes for static html pages
app.use(express.static(path.join(__dirname, 'public')));

// 404 error

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// listen on port
app.listen(PORT, () => console.log("Server Listening on port " + PORT));