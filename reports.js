module.exports = function() {
	var express = require('express');
	var router = express.Router();

	// This is for the "Team Active Player Salary Cap Report"
	function getSportReport(res, mysql, context, complete) {
		var myQuery = 'SELECT team_name, active_salary_cap, city, state, sport_name FROM teams ' +
					'JOIN sports ON teams.sport = sports.sport_id';
		mysql.pool.query(myQuery, function(error, results, fields) {
			if (error) {
				console.log('Error Bad query'); 
				throw error;
			}
			context.title = 'reports page';
			context.results = results;
			complete();
		});
	}


	// This is for the "Sports Injury Report"
	function getInjuryReport(res, mysql, context, complete) {
		
		var myQuery = 'SELECT sport_name, injury_name, injury_type FROM health_risks ' +  
						'JOIN sports ON health_risks.sport_id = sports.sport_id ' +
						'JOIN injuries ON health_risks.injury_id = injuries.injury_id'; 

		mysql.pool.query(myQuery, function(error, results, fields) {
			if (error) {
				console.log('Error: query unsucessful');
				throw error;
			}
			context.row = results;
			complete();
		});
	}
	

	router.get('/', function(req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getSportReport(res, mysql, context, complete);
		getInjuryReport(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 2) {
				res.render('reports', context);
			}
		}	
	}); 

	return router;
}();