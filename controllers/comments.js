var express = require("express");
var router = express.Router();
var db = require('../models');

router.get('/:id', function (req, res) {
	var id = req.params.id;
	db.favorites.findById(id).then(function(fav) {
		fav.getComments().then(function(comment) {
			res.render('comments.ejs', {
				comment:comment, //giving access to comments db
				fav: fav, //giving access to favorites db
			});
		});
	});
	// res.render('comments.ejs');
});

router.post('/:id', function (req, res) {
	var id = req.params.id;
	var name = req.body.name;
	var comment = req.body.comment;
	db.comment.create({
		comment:comment,
		favoriteId:id,
		comment_author:name
	}).then(function(){
		res.redirect('/comments/' + id);
	});
} );


module.exports = router;