// REQUIRES
var express = require('express');
var router = express.Router();
var request = require("request");

// ROUTES

router.get("/", function(req, res){
	var movie = (req.query.movieSearch);
	var qs = {
		s: movie
	};
	request({
		url: 'https://www.omdbapi.com',
		qs: qs
	}, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var dataObj = JSON.parse(body);
			// Uncomment to test
			// res.send(dataObj.Search);
			res.render("results", {results: dataObj.Search})
		}
	});
});


// EXPORT
module.exports = router;