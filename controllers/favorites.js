var express = require("express");
var bodyParser = require('body-parser');
var db = require('../models');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.post("/", function(req, res){
	var newFav = req.body;
	if (newFav.imdbID){

		db.favorite.findOrCreate({
			where:{
				imdbID: newFav.imdbID,
				title: newFav.title,
				year: newFav.year
			}
		}).spread(function(favorites, created){
			console.log(created);
			console.log(favorites.get());
		}).then(function(){
			res.redirect("favorites");
		});
		
	} else{
		res.send("Invalid Movie Data?!");
	}
});


router.get('/', function(req,res){
	db.favorite.findAll().then(function(favorite){
		res.render("favorites.ejs", {favorite:favorite});
	});
	//res.render("favorites");
});



module.exports = router;