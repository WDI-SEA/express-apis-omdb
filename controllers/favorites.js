var express = require("express");
var bodyParser = require("body-parser");
var db = require('../models');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res){
	var favorite = req.body;
	console.log(favorite);
	if(favorite.title){
		db.favorites.create({
			imdbCode: favorite.imdbID,
			year: favorite.year,
			title: favorite.title
		}).then(function(pussy){
			res.redirect('/movie/' + favorite.imdbID);
		})
	}else{
		res.send('Not a real movie.');
	}
})

router.get('/', function(req, res){
	db.favorites.findAll().then(function(favorites){
		res.render('favorites.ejs', {favorites:favorites})
	});
});

module.exports = router;