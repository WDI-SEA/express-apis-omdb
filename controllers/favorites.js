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

router.get('/:id/comments', function(req, res){
	var id = req.params.id;
	db.favorite.find({
		where: {id: id},
		include: [db.comment]
	}).then(function(fav){
		console.log(fav.comments);
	res.render('comments.ejs', {favorite: fav, id:id})
		});
	});


router.post('/:id/comments', function(req, res){
	var id = req.params.id;
	var comment = req.body.comment;
	var name = req.body.name;
	db.comment.create({
		comment: comment,
		name: name,
		favoriteId: id
	}).then(function(favorite){
		res.redirect('/favorites/' + req.params.id + '/comments');
	})
});

module.exports = router;