module.exports = function() {
	var express = require('express');
	var router = express.Router();

	function getSportByName(req, res, mysql, context, complete) {
		var query = 'SELECT sport_name, professional_organization FROM sports WHERE ' +
					mysql.pool.escape(req.params.s + '%');
		mysql.pool.query(query, function(error, results, fields) {
			if (error) {
				console.log('error in query of charts.js')
				throw error;
			}
			context.sport = results;
			console.log("query from getSportByName:"); /////////// -- delete later
			console.log(context); //////////  --- delete later
			complete();
		});
	}


	router.get('/', function(req, res) {
		res.render('charts', {title:"charts page"});
	});


	router.get('/search/:s', function(req, res){
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["selectsports.js"];
		var mysql = req.app.get('mysql');
		getSportByName(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('charts', context);
			}
		}
	});
	return router;
}();
