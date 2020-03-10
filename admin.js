module.exports = function(){
    var express = require('express');
    var router = express.Router();

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
	
	function getTeams(res, mysql, context, complete){
		var myQuery = 'SELECT team_name, active_salary_cap, city, state, sport_name FROM teams ' +
					'JOIN sports ON teams.sport = sports.sport_id';
        mysql.pool.query(myQuery, function(error, results, fields){
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
            context.teams = results;
            complete();
        });
    }
	
	function getInjuries(res, mysql, context, complete){
		var myQuery = "SELECT injury_id, injury_type, injury_name, injury_notes FROM injuries";
        mysql.pool.query(myQuery, function(error, results, fields){
		if (error) {
			console.log("Error Bad query"); 
			throw error;
		}
            context.injuries = results;
            complete();
        });
    }
	
// get single Sport
    function getSportSingle(res, mysql, context, id, complete){
        var sql = "SELECT sport_id as id, sport_name, professional_organization FROM sports WHERE sport_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }


	// Show all injuries, teams, sports

    router.get('/', function(req, res){
        var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deletesport.js"];
        var mysql = req.app.get('mysql');
        getSports(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
		getInjuries(res, mysql, context, complete);
        function complete(){
			callbackCount++;
            if(callbackCount >= 3){
                res.render('admin', context);
			}
        }
    });
	
	// Add sports, redirects back to admin afterward
	
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO sports (sport_name, professional_organization) VALUES (?,?)";
        var inserts = [req.body.s_name, req.body.prof_org];
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
	
	// Add teams, redirects back to admin afterward

    router.post('/admin/newteam', function(req, res){
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

	// Update sports
	
	
	// Delete sports
	
	router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM sports WHERE sport_id = ?";
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