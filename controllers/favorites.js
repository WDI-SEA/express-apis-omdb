var express = require("express");
var router = express.Router();
var db = require("../models");
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render('fav/favorites', {
			favorites: favorites
		});
	});
});

router.post("/", function(req, res) {
	db.favorite.create({ 
		imdbID: req.body.imdbID, 
		title: req.body.title, 
		year: req.body.year, 
		plot: req.body.plot
	}).then(function() {
		res.redirect("/favorites");
	});
});

module.exports = router;