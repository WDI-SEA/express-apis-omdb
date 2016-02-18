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
	db.favorites.findOrCreate({
		where: { imdbid: imdb },
		defaults: {
		title: title,
		year: year
		}
	}).spread(function(favorite, create) {
		console.log(favorite.get());
		res.redirect("/movies/"+imdb);
	//console.log(title, year, imdb);
	});
	

});

// router.get(:id/tags, function (req, res) {
// 	db.favorites.findById().then(function(fav) {
//   		tag.createTag({name: 'funny'}).then(function(tag) {
//     		console.log(tag.get());
//   		});
// 	});
// });

// router.post(:id/tags, function (req, res) {
// 	db.favorites.findById().then(function(fav) {
// 		tag.

// 	});
// });


router.get("/:id/comments", function(req, res){
	var favoriteId = req.params.id;
	db.favorites.findById(favoriteId).then(function(fav) {
		fav.getComments().then(function(comments) {
			res.send(comments);
		});
	});
});

router.post("/:id/comments", function (req, res) {
	db.comment.create({
		comment:req.body.comment,
		comment_author:req.body.comment_author,
		favoriteId: req.params.id
	}).then(function(){
		res.redirect("/favorites/" + req.params.id + "/comments");
	});
});



// router.delete("/", function(req, res) {
// 	db.favorites.
// })

module.exports = router;