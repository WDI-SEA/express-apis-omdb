var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();

router.use(ejsLayouts);
router.use(bodyParser.urlencoded({extended: false}));


router.get("/", function(req, res){
	db.favorite.findAll({
		}).then(function(fav){
			res.render("favorites/index.ejs", {
				fav: fav

			});
		});
	
	});

router.post("/", function(req, res){
	var title = req.body.title;
	var year = req.body.year;
	var imdbId = req.body.imdbID;
	console.log('hello');
	db.favorite.create({
		title: title,
		year: year,
		imdbId: imdbId
	});
	res.redirect("/favorites");
});
module.exports = router;