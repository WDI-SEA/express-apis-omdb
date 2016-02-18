var express = require('express');
var db = require('../models');
var router = express.Router();

router.get("/:id", function (req, res) {
	var id = req.params.id;
	db.favorites.findById(id).then(function(fav){
		fav.getTags().then(function(tag){
			res.render('tags.ejs', {
				fav:fav,
				tag:tag
			});
		});
	});
});

router.post("/:id", function (req, res) {
	var id = req.params.id;
	var name = req.body.name;
	db.favorites.findById(id).then(function(fav){
		db.tag.findOrCreate({
			where: {
				name:name
			}
		}).spread(function (tag, created) {
			db.favoritesTags.create({
				favoriteId:id,
				tagId:tag.id
			}).then(function(){
				res.redirect('/tags/'+id);
			});
		});
	});	
});

router.get("/showtags/:id", function (req, res) {
	var id = req.params.id;
	db.tag.findById(id).then(function(tag) {
		tag.getFavorites().then(function(fav) {
			res.render('showtags', {
				name:tag,
				fav:fav
			});
		});
	});
});

module.exports = router;