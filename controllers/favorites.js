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
	db.favorite.findOrCreate({
		where: {
			imdbCode: req.body.imdbID
		}, defaults: {
		title: req.body.title,
		year: req.body.year,
		}
	}).spread(function(favorite, created) {
		res.redirect('/favorites');
	});
});

//I used imdbCode as shared link, but should have connected through Favorite ID
//See class example for how to do this as it allows us to pull the movie name from favorites table

router.get('/:id/comments', function(req, res) {
	var favoriteId = req.params.id;  //id is IMDBid
	db.favorite.find({
		where: {id: favoriteId},
		include: [db.comment]
	}).then(function(fav) {
		res.render('favorites/comments', {favorite: fav});
	});
});

router.post('/:id/comments', function(req, res) {
	db.comment.create({
		author: req.body.name,
		text: req.body.newComment,
		favoriteId: req.params.id
	}).then(function() {
		res.redirect('/favorites/'+req.params.id+'/comments');
	});
});

router.get('/:id/tags', function(req, res) {
	res.render('favorites/tags');
});

router.post('/:id/tags', function(req, res) {
	var favId = req.params.id;
	db.favorite.findById(favId).then(function(favorite){
		favorite.createTag({
			name: req.body.newTag
		}).then(function() {
			res.redirect('/favorites');
		});
	});
});


module.exports = router;