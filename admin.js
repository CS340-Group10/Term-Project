module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getSports(res, mysql, context, complete){
		var myQuery = "SELECT sport_id as id, sport_name, professional_organization FROM sports";
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
                res.render('admin', context);
        }
    });

	return router;

}();