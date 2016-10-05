var express = require("express");
var request = require("request");


var router = express.Router();

router.get("/:id", function(req, res) {
	var seachQuery = { i: req.params.id };
	request({
		url: "http://www.omdbapi.com",
		qs: seachQuery
	}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			console.log(movieData.Title);
			res.render("movie_details.ejs", { movie: movieData });
		} else {
			res.send("Error was " + error);
		}
	});
});


module.exports = router;