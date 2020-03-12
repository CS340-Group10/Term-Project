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
	
	router.get('/', function(req, res){
        var callbackCount = 0;
		var context = {};
        var mysql = req.app.get('mysql');
		getSports(res, mysql, context, complete);
        function complete(){
                res.render('admin-injuries', context);
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

	return router;

}();