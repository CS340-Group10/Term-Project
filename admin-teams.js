module.exports = function(){
    var express = require('express');
    var router = express.Router();
	
	function getTeams(res, mysql, context, complete){
		var myQuery = 'SELECT team_id, team_name, city, state, sport_name FROM teams ' + 'JOIN sports ON teams.sport = sports.sport_id';
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
		var myQuery = "SELECT sport_id, sport_name FROM sports";
        mysql.pool.query(myQuery, function(error, results, fields){
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
            context.sports  = results;
            complete();
        });
    }
	
	// Get Single Team
	
	function getTeamSingle(res, mysql, context, id, complete){
        var sql = "SELECT team_id, team_name, revenue, city, state, sport, active_salary_cap, signed FROM teams WHERE team_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results[0];
            complete();
        });
    }
	
	// render team management page

    router.get('/', function(req, res){
        var callbackCount = 0;
		var context = {};
        var mysql = req.app.get('mysql');
		getTeams(res, mysql, context, complete);
		getSports(res, mysql, context, complete);
        function complete(){
			callbackCount++;
            if(callbackCount >= 2){
                res.render('admin-teams', context);
			}
        }
    });
	
	// Add teams, redirects back to admin afterward

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO teams (team_name, city, state, sport, revenue, active_salary_cap, signed) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.team_name, req.body.city, req.body.state, req.body.sport_type, req.body.revenue, req.body.activ_cap, req.body.signed];
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
	
	// Update Teams
	
	router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateteam.js", "selectsport.js"];
        var mysql = req.app.get('mysql');
        getTeamSingle(res, mysql, context, req.params.id, complete);
		getSports(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-team', context);
            }
        }
    });	
	
	
	// UPDATE URI FOR TEAMS
	
	router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE teams SET team_name=?, city=?, state=?, sport=?, revenue=?, active_salary_cap=?, signed=? WHERE team_id=?";
        var inserts = [req.body.t_name, req.body.city, req.body.state, req.body.sport_type, req.body.revenue, req.body.active_cap, req.body.signed, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
	
	return router;

}();