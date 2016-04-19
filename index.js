var express = require("express");
var ejsLayouts = require("express-ejs-layouts")
var request = require("request");
var db = require('./models')



var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

console.log(__dirname);

app.get('/', function(req, res) {
	res.render('index.ejs');
})

app.get('/movies', function(req, res) {
	var query = req.query.q;

	request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
		var data = JSON.parse(body);
		if (!err && response.statusCode === 200 && data.Search) {
			var results= data.Search;
			res.render("movies", {results: results})
		} 
	})
});

app.get('/movies/:imdbID', function(req, res) {
	var searchQuery = req.query.q ? req.query.q : '';
	var imdbID = req.params.imdbID;
	request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
		res.render('movieDescrip.ejs', {movie: JSON.parse(body), q: searchQuery});
	})
});

app.get("/favorites", function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render("favorites", {favorites: favorites})
	})
})

app.post("/favorites", function(req, res) {
	db.favorite.create({
		imdbID: req.body.imdbID,
		title: req.body.title,
		year: req.body.year
	}).then(function() {
		res.redirect("/favorites");
	})
});

app.delete("/favorites/:imdbID", function(req, res) {
	var imdbID = req.params.imdbID;
	db.favorite.destroy({where: {imdbID: imdbID}}).then(function() {
		res.send({'msg': 'success'});
	})
});

app.get("/favorites/:imdbID/comments", function(req, res) {
	db.favorite.find({where: {imdbID: req.params.imdbID}}).then(function(favorite) {
		db.comment.findAll({where: {favoriteId: favorite.id}}).then(function(comments) {
			res.render("comments", {favorite: favorite, comments: comments});
		});
		//res.render("comments", {favorite: favorite});
	});
});

app.post("/comments", function(req, res) {
	var newComment = req.body;

	db.favorite.find({where: {id: newComment.favoriteId}}).then(function(favorite) {
		favorite.createComment(newComment).then(function(comment) {
			res.redirect("/favorites/" + favorite.imdbID + "/comments");
		});
	});
});

app.get("/favorites/:imdbID/tags", function(req, res) {
	console.log("route tried");
	db.favorite.find({where: {imdbID: req.params.imdbID}}).then(function(favorite) {
		favorite.getTags().then(function(tags) {
			res.render("tags", {favorite: favorite, tags: tags});
		});
	});
});

app.post("/tags", function(req, res) {
	var newTag = req.body;
	console.log(newTag);
	db.favorite.find({where: {id: newTag.favoriteId}}).then(function(favorite) {
		db.tag.findOrCreate({where: {tag: newTag.tag}}).then(function(tag) {
			favorite.createTag(newTag).then(function(tag) {
				res.redirect("/favorites/" + favorite.imdbID + "/tags");
			});	
		});
	});
});

app.get("/tags/:tag", function(req, res) {
	db.tag.find({where: {tag:req.params.tag}}).then(function(tag) {
		console.log(tag);
		tag.getFavorites().then(function(favorites) {
			console.log("JNLJNLNLJNJNJLNLJ",favorites);
			res.render("tagmovies", {tag: tag, favorites: favorites})
		});
	});
});

// app.get('/favorites', function(req, res) {
// 	res.render('favorites.ejs');
// })

// app.post('/favorites/:imdbID', function(req, res) {
// 	db.movies.create(req.body).then(function() {
// 		res.redirect('movies/:imdbID');
// 	}
// })



app.listen(3000);

