var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/:id', function(req, res) {
	var id = req.params.id;
	request("http://www.omdbapi.com/?i="+id, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			res.render("movie/index.ejs", {
				movieData: movieData
			});
		}
	});
});

module.exports = router;