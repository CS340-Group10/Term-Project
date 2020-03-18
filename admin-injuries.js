module.exports = function(){
    var express = require('express');
    var router = express.Router();
	
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
	
	// Get Single Injury
	
	function getInjurySingle(res, mysql, context, id, complete){
        var sql = "SELECT injury_id, injury_name, injury_type, injury_notes FROM injuries WHERE injury_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.sport = results[0];
            complete();
        });
    }
	
	// Update single injury by ID
	
	router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateinjury.js"];
        var mysql = req.app.get('mysql');
        getInjurySingle(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-injury', context);
            }
        }
    });	
	
	
	router.get('/', function(req, res){
        var callbackCount = 0;
		var context = {};
        var mysql = req.app.get('mysql');
		getSports(res, mysql, context, complete);
		getInjuries(res, mysql, context, complete);
        function complete(){
		    callbackCount++;
            if(callbackCount >= 2){
                res.render('admin-injuries', context);
			}
        }
    });
	
	// Add injuries, redirects back to admin afterward

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO injuries (injury_name, injury_type, injury_notes) VALUES (?,?,?)";
        var inserts = [req.body.injury_name, req.body.injury_type, req.body.injury_notes];
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
	
	
	// update URI for injuries
	
	router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE injuries SET injury_name=?, injury_type=?, injury_notes=? WHERE injury_id=?";
        var inserts = [req.body.in_name, req.body.in_type, req.body.in_notes, req.params.id];
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