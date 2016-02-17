var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();

router.use(ejsLayouts);
router.use(bodyParser.urlencoded({extended: false}));


router.get("/", function(req, res){
	//res.send(process.env.MY_SECRET_KEY);
	db.favorite.findAll({
		}).then(function(fav){
			res.render("favorites/index.ejs", {
				fav: fav
			});
		});
	}
);

router.get("/:id/comments", function(req, res){
	var favoriteId = req.params.id;
	db.favorite.find({
    	where: {id: favoriteId},
    	include: [db.comment]
  	}).then(function(fav) {
    // res.send(fav);
    res.render('comment.ejs', {favorite: fav});
  	});
});

router.post('/:id/comments', function(req, res) {
  	db.comment.create({
    	content: req.body.content,
    	author: req.body.author,
    	favoriteId: req.params.id
  	}).then(function() {
    	res.redirect('/favorites/' + req.params.id + '/comments');
  	});
});

router.post("/", function(req, res){
	var title = req.body.title;
	var year = req.body.year;
	var imdbId = req.body.imdbID;
	db.favorite.create({
		title: title,
		year: year,
		imdbId: imdbId
	}).then(function(){
		res.redirect("/favorites");
	});
	
});

router.get('/:id/tags', function(req,res) {
    db.tag.findAll().then(function(tag) {
        res.render('tags.ejs', {tag: tag})
    })
})


router.post('/:id/tags', function(req,res) {
    db.tag.findOrCreate({
        where: { 
            tag: req.body.tag
        }
    }).spread(function(tag) {
        db.favoritesTags.findOrCreate( {
            where: {
                tagId: tag.id,
                favoriteId: req.body.id
            }
        }).spread(function(join) {
            res.send(join)
        })
        });
});






module.exports = router;

