var express = require("express");
var db = require("./../models");
var router = express.Router();


// Favorites page
router.get("/", function(req, res) {
	// res.send(db.omdbFavorite);
	db.omdbFavorite.findAll().then(function(favorites) {
		res.render("favorites/index.ejs", {favorites: favorites});
	});
});


// Inserts selected movie into omdbFavorite db
router.post("/:imdbID", function(req, res) {
	var favorite = req.body;

	console.log(req.body);
	db.omdbFavorite.create({
		imdbCode: favorite.favId,
		title: favorite.favTitle,
		year: favorite.favYear
	})
		res.redirect("/results/" + favorite.favId);
	
});

module.exports = router;	