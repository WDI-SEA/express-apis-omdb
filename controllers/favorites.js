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
router.get('tags/:id', function(req, res){
	var id = req.params.id;
	db.tag.findById(id).then(function(tag){
		res.render('/tagsfilter', {tags: tag});
	});
});

router.get('/tags', function(req, res){
	var id = req.params.id;
	db.tag.findAll({where: {tagId: id}}).then(function(tags){
		res.render('tagsall', {tags: tags});
	});
});


router.get('/:id/tags', function(req, res){
	var id = req.params.id;
	db.favorite.find({
		where: {id: id},
		include: [db.tag]
	}).then(function(fav){
		res.render('tags.ejs', {favorite: fav});
	});
});

router.post('/:id/tags', function(req, res){
	var id = req.params.id
	var tag = req.body.tag;
	db.favorite.find({where: {id: id}}).then(function(movie){
		db.tag.findOrCreate({where: {
		tag: tag,
		favoriteId: id},
		include: [db.favorite]
	}).spread(function(newTag){
		db.favoritesTags.findOrCreate({where: {tagId: newTag.id,
			favoriteId: movie.id}})
	}).spread(function(){
				res.redirect('tagsall');	
			});
		});
	});


module.exports = router;