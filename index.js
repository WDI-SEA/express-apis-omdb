var express = require("express");
var app = express();
var db = require('./models');
var request = require('request');
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/static")); //to link to the static files, dirname(node sets it) var that gives absolute path to dir we are in

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.get("/results", function(req, res) {
	var search = req.query.search;
	request('http://www.omdbapi.com/?s='+search,function(error, response, body) {
  			if (!error && response.statusCode == 200) {
    		res.render("resultShow.ejs", { movieDetails: body});

  		}
	});
});

app.get("/movie/:imbdId", function(req, res) {
	request('http://www.omdbapi.com/?i='+ req.params.imbdId, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			res.render("movie.ejs", {movie: body});

		}
	});
});

app.post('/favorites', function(req, res) {
	// var favorite = req.body;
	// if(favorite.title) {
	// 	db.favorite.create({
	// 		imbd:favorite.imbdid,
	// 		year:favorite.year,
	// 		title:favorite.title
	db.favorite.create({
		imbdId: req.body.imdbid, //takes form input and stores it in rec.body
		name: req.body.title,
		year: req.body.year
	}).then(function(saved) {
		res.redirect('/favorites');
	});
});



app.get('/favorites', function(req, res) {
	db.favorite.findAll().then(function(favs){
		res.render('favorites.ejs', {favArray: favs})
	});
})



















app.listen(3000);