var express = require("express");
var router = express.Router();
var db = require('../models');
// current directory : localhost:3000/favorites
// router.use(express.static(__dirname + '/static'));

/// localhost:3000/favorites/
router.get("/", function(req, res) {
	db.favorite.findAll().then(function(fav) {
		res.render('favorites.ejs', {fav:fav})
	})
	//this is where I will list the database entries
});

router.post("/", function(req, res) {
	var title = req.body.favtitle;
	var year = req.body.favyear;
	var imdb = req.body.favimdb;

	db.favorite.create({
		imdbId: imdb,
		title: title,
		year: year
	});

	// console.log(title, year, imdb);

	res.redirect("/movies/" + imdb);
})


module.exports = router;