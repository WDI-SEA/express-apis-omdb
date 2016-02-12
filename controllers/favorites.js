var express = require('express');
var app = express();
var router = express.Router();
var db = require('../models');

app.set('view engine', 'ejs');

router.get("/", function(req, res) {
	db.favorite.findAll().then(function(films) {
		res.render('favorites/index.ejs', {films: films})
	});
});

router.post("/", function(req, res) {
	var title = req.body.title;
	var year = req.body.year;
	var imdbID = req.body.imdbID;
	db.favorite.create({
		title: title,
		year: year,
		imdbCode: imdbID
	});
	res.redirect('/movie/' + imdbID);
});


module.exports = router;