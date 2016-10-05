// Requires
var express = require('express');
var bodyParser = require("body-parser");
var request = require("request");
var movieController = require("./controllers/movie.js");

// Declare our global variabls
var app = express();

// Use or set statements
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use("/movie", movieController);



// Routes define here.
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results", function(req, res) {
	var searchTerm = {s: req.query.q};
	console.log(searchTerm);
		
	request({
		url: "http://www.omdbapi.com",
		qs: searchTerm
	}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			res.render("movie_list", { movies: movieData.Search });
			console.log(movieData);
		} else {
			res.send("Error was " + error);
		}
	});
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
