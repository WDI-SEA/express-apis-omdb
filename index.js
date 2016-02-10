var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var app = express();

app.set("view engine", "ejs");

app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.get("/results", function(req, res) {
	var qs = req.query.movieChoice;
	console.log(qs);
	request( "http://omdbapi.com/?s=" + qs,
		function (error, response, body) {
			if(!error && response.statusCode == 200 ) {
				console.log(body)
				movies = JSON.parse(body);
				res.render("results.ejs", { movies: movies });
			}
		}
	);
});

app.get("/results/:imdbID", function(req, res) {
	var movieId = req.params.imdbID;
	
	request("http://omdbapi.com/?i=" + movieId,
		function (error, response, body) {
			if(!error && response.statusCode == 200) {
				movieInfo = JSON.parse(body);
				res.render("showMovie.ejs", {movieInfo: movieInfo});
			}
		}
	);
});


app.listen(3000);