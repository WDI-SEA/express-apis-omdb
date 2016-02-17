var express = require("express");
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

router.get('/', function(req, res){
	var searchTerm = req.query.q ? req.query.q : '';

	request('http://www.omdbapi.com/?s=' + searchTerm, function(error, response, body){
		if(!error && response.statusCode == 200){
			var movieList = JSON.parse(body);
			res.render("results", {movieList: movieList,
														 searchTerm: searchTerm});
		}else{
			res.render('error');
		}
	})
})


module.exports = router;