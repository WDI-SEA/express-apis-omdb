var express = require("express");
var bodyParser = require("body-parser");
var db = require('../models');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


//Route that posts data and adds a movie to a list of favorites
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

//Router to display a list of movies that have been favorited
router.get('/', function(req, res){
	db.favorites.findAll().then(function(favorites){
		res.render('favorites.ejs', {favorites:favorites})
	});
});

//Displays comments on movies based on the id in the table of the movie
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

//Creates comments from form data.  Duplicates are okay.
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

//Displays page where you can add a tag to a movie
router.get('/:id/addTag', function(req, res){
	db.favorites.find({
		where: {
			id: req.params.id
		}
	}).then(function(movie){
		res.render('addTag', {movie: movie});
	})
})

//Route to add a tag to a movie
router.post('/:id/addTag', function(req, res){
	movieID = req.params.id;
	db.favorites.find({
		where: {
			id: movieID
		}
	}).then(function(movie){
		db.tags.findOrCreate({
			where:{
				tag: req.body.tag
			}
		}).spread(function(newTag){
			db.tagsFavorites.findOrCreate({where:{
				tagId: newTag.id,
				favoriteId: movie.id
			}
		})
		res.redirect('addTag')
			})
	})
})

//Lists all the tags from the DB
router.get('/tags', function(req, res){
	db.tags.findAll().then(function(tags){
		res.render('tags', {tags: tags});
	})
})

//Should filter all the movies matching a tag
//receiving error: "Unhandled rejection Error: favorites is not associated to tagsFavorites!"
router.get('/tag/:id', function(req, res){
	tagId = req.params.id;
	console.log(tagId);
	db.tagsFavorites.find({
		where:{
			id: tagId
		},
		include: [db.favorites]
	}).then(function(joins){
		res.send(joins.get())
	})
})

module.exports = router;