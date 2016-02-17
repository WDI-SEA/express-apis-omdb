var express = require("express");
var app = express();
// var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();

// router.use(ejsLayouts);
router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res){
	db.favorite.findAll(
		).then(function(fav){
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
	}).then(function(){
	res.redirect("/favorites");
	});
});

router.get('/:id/comments', function (req, res) {
	var favoriteId = req.params.id;
	// db.favorite.findById(favoriteId).then(function(fav){
	// 	fav.getComments().then(function(comments) {
	// 		res.send(comments);
	// 	});
	// });
	db.favorite.find({
		where: {id: favoriteId},
		include: [db.comment]
	}).then(function(fav) {
		// res.send(fav);
		res.render('favorites/comments', {favorite: fav});
	});
});

router.post('/:id/comments', function(req, res){
	db.comment.create({
		commentText: req.body.commentText,
		favoriteId: req.params.id,
		commentAuthor: req.body.commentAuthor
	}).then(function() {
		res.redirect('/favorites/' + req.params.id + '/comments');
	});
});

router.get('/:id/tags', function(req, res) {
	// var favoriteId = req.params.id;
	db.favorite.find({
		where: {id: id},
		include: [db.tag]
	}).then(function(fav) {
		res.render('favorites/tag', {favorite: fav});
	});
});

router.post('/:id/tags', function(req, res){
	db.tag.create({
		name: req.body.movieTag
	}).then(function() {
		res.redirect('/favorites' + req.params.id + '/tags');
	});
});
module.exports = router;