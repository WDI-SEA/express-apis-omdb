var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db = require("./models");
var request = require("request");
var favorites = require("./controllers/favorites.js")
var searchResult;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));


// Home page
app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.get("/movies", function(req, res){
	var searchResult = req.query.search;
	request('http://www.omdbapi.com/?s='+searchResult,function(error, response, body){
		if (!error && response.statusCode == 200) {
			res.render("movies/index.ejs", {movieDetails: body});
		}
	});
});

app.get("/movies/:imbdId", function(req, res) {
 	request('http://www.omdbapi.com/?i='+req.params.imbdId, function(error, response, body) {
 		if (!error && response.statusCode == 200) {
 			body = JSON.parse(body);
 			res.render("movies/show.ejs", {movieData: body});
		}
	});
});

app.get("/favorites", function(req, res){
	db.favorite.findAll().then(function(movie){
		res.render("favorites/index.ejs", {movie:movie})
	});
});

app.listen(4000);