const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('./dbconnect.js');
app.use('/static', express.static('public'));

// setup body parser
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5017;

// Set up handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set up sql
app.set('mysql', mysql);
//app.set('views', path.join(__dirname, 'views'))

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
app.use('/reports', require('./reports.js'));

// route for charts page
app.use('/charts', require('./charts.js'));

//route for admin page
app.use('/admin', require('./admin.js'));
app.use('/admin-teams', require('./admin-teams.js'));
app.use('/admin-injuries', require('./admin-injuries.js'));

// This are routes for static html pages
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('public'));


// 404 error

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// listen on port
app.listen(PORT, () => console.log("Server Listening on port " + PORT));
