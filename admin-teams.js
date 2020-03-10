module.exports = function(){
    var express = require('express');
    var router = express.Router();
	
	function getTeams(res, mysql, context, complete){
		var myQuery = 'SELECT team_id, team_name, active_salary_cap, city, state, sport_name FROM teams ' + 'JOIN sports ON teams.sport = sports.sport_id';
        mysql.pool.query(myQuery, function(error, results, fields){
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
            context.teams = results;
            complete();
        });
    }
	
	function getSports(res, mysql, context, complete){
		var myQuery = "SELECT sport_id, sport_name, professional_organization FROM sports";
        mysql.pool.query(myQuery, function(error, results, fields){
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
            context.sports  = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
		var context = {'deletesport.js'};
        var mysql = req.app.get('mysql');
		getTeams(res, mysql, context, complete);
		getSports(res, mysql, context, complete);
        function complete(){
			callbackCount++;
            if(callbackCount >= 3){
                res.render('admin-teams', context);
			}
        }
    });
	
	// Add teams, redirects back to admin afterward

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO teams (team_name, city, state, sport) VALUES (?,?,?,?)";
        var inserts = [req.body.team_name, req.body.city, req.body.state, req.body.sport_type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/admin');
            }
        });
    });	
	
	router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM teams WHERE team_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

	return router;

}();