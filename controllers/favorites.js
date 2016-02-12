var express = require('express');
var db = require("../models");
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));

// configure add to favorites button
// console.log data first before sending it to db to ensure correct info captured

router.get('/', function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render("favorites/index.ejs", {
			favorites: favorites
		});
	});
});

router.post('/', function(req, res) {
	var movie = req.body;
	if (movie.title) {
		db.favorite.create({
		imdbId: movie.imdbId,
		title: movie.title,
		year: movie.year,
		poster: movie.poster,
	}).then(function(){
		res.redirect('/favorites');
	});
	}
	
});

module.exports = router;