var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res){
	db.favorite.findAll().then(function(fave){
		res.render('favorite.ejs', {
			fave:fave});
		});
	});
router.post('/', function(req,res) {
	var title = req.body.title;
	var year = req.body.year;
	var imdbID = req.body.imdbID;
	db.favorite.create({
		title: title,
		year: year,
		imdbId: imdbID
	}).then(function(favorite){
		res.redirect('/results/'+ imdbID);
	})
});

module.exports = router;