var express = require("express");
var bodyParser = require("body-parser");
var db = require('../models');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res){
	var favorite = req.body;
	console.log(favorite);
	if(favorite.title){
		db.favorites.findOrCreate({
			where: {
				imdbCode : favorite.imdbID,
				title : favorite.title,
				year: favorite.year
			}
			}).spread(function(newMovie, isCreated){
				console.log(newMovie);
				res.redirect('/movie/' + favorite.imdbID);
			})
	}
	else{
				res.send('Not a real movie.');
			}
});

router.get('/', function(req, res){
	db.favorites.findAll().then(function(favorites){
		res.render('favorites.ejs', {favorites:favorites})
	});
});

router.get('/:id/comments', function(req, res){
	db.favorites.find({
		where: {
			id: req.params.id,
		}
	}).then(function(favorite) {
			favorite.getComments().then(function(comments) {
				res.render('comments', {favorite, comments});
			})
		})
	})


router.post('/:id/comments', function(req, res){
	var commentBody = req.body;
	console.log(commentBody);
	db.comment.create({
		author: commentBody.author,
		text: commentBody.comment,
		favoriteId: req.params.id
	}).then(function(){
		res.redirect('/favorites/' + req.params.id + '/comments');
	})
})


module.exports = router;