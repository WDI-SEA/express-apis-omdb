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
	db.omdbFavorite.create({
		imdbCode: favorite.favId,
		title: favorite.favTitle,
		year: parseInt(favorite.favYear)
	}).then(function() {
		res.redirect("/favorites");
	})
});

// Comments Page
router.get("/:imdbID/comments", function(req, res) {
	var imdbCode = req.params.imdbID;
	db.omdbFavorite.find({
		where: {
			imdbCode: imdbCode
		},
		include: [db.comment]
	}).then(function(fav) {
		// res.send(fav);
		console.log(fav);
		res.render("favorites/comments", {favorite: fav});
	});
});


// Posts a comment to comment page
router.post("/:imdbID/comments", function(req, res) {
	var movie = req.params.imdbID;
	db.comment.create({
		body: req.body.body,
		author: req.body.author,
		favoriteId: req.body.id
	}).then(function() {
		res.redirect("/favorites/" + movie + "/comments");
	});
});

// Add Tag page
router.get("/:imdbID/tags", function(req, res) {
	var imdbCode = req.params.imdbID;
	db.omdbFavorite.find({
		where: {
			imdbCode: imdbCode
		},
		// include: [db.tag]
	}).then(function(fav) {
		 res.render("tags", {favorite: fav});
	})
});

// Posts a tag to a movie
router.post("/:imdbID/tags", function(req, res) {
	db.tag.findOrCreate({
		where: {
			tag: req.body.tag,
			favoriteId: req.body.id
		}
	}).spread(function(tag, created) {
		console.log(tag);
		db.omdbFavorite.findById(req.body.id).then(function(favorite) {
		 	favorite.addTag(tag).then(function() {

			});
	    });
	});
});





module.exports = router;	