var express = require("express");
var router = express.Router();
var db = require('../models');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));

// router.get("/", function (req, res) {
// 	res.render('favorites.ejs')

// });

router.get("/", function (req, res) {
	db.favorites.findAll().then(function(favmovie) {
		res.render('favorites.ejs', {favmovie:favmovie})
	});
});

router.post("/", function(req, res) {
	var title = req.body.favTitle;
	var year = req.body.favYear;
	var imdb = req.body.favImdb;
	db.favorites.create({
		title: title,
		year: year,
		imdbid: imdb
	});
	res.redirect("/movies/"+imdb);
	//console.log(title, year, imdb);

});

// router.delete("/", function(req, res) {
// 	db.favorites.
// })

module.exports = router;