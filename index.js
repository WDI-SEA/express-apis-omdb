var express = require('express');
var app = express();
var db = require("./models");
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var request = require('request');

var path = require('path');
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('/', function(req, res) {
	res.render('movieSearchForm/index.ejs');
})

app.get('/results', function(req, res) {
	var title = req.query.title;
	request(
		'http://www.omdbapi.com/?type=movie&s='+title, 
		function(error, response, body) {
			var data = JSON.parse(body);
			if(!error && response.statusCode == 200 && data) {
				res.render('movieSearchResults.ejs', {
					movie: data
				});
			} else {
				res.render('No movies found!');
			}
		}
	);
});

app.get('/details/:id', function(req, res) {
	// var searchQuery = req.query.q ? req.query.q : '';
	var id = req.params.id;
	request('http://www.omdbapi.com/?i='+id, 
		function(error, response, body) {
			if(!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				console.log(data);
				res.render('movieDetails.ejs', {
					movie: data
				});
			}
		}
	);
});

app.get('/favorites', function(req, res) {
	db.favorite.findAll({
		order: 'title ASC'
	}).then(function(favorites) {
		// console.log(favorites);
		res.render('./favorites/index.ejs', {
			favorites: favorites
		});
	});
});


// see comments
app.get('/favorites/:id/comments', function(req, res) {
	db.favorite.findById(req.params.id).then(function(favorites) {
		favorites.getComments().then(function(comments) {
			// console.log(comments);
			res.render('comments.ejs', {
				favorites: favorites,
				comments: comments
			});
		});
	});
});

//post comments, save as above but use app.post

app.get('/favorites/:id/tags', function(req, res) {
	db.favorite.findById(req.params.id).then(function(favorites) {
		favorites.getTags().then(function(tags) {
			console.log(tags);
			res.render('addTag.ejs', {
				favorites: favorites
			});
		});
	});
});

app.post('/favorites/:id/tags', function(req, res) {
	db.tag.findOrCreate({
		where: {
			tag: req.body.tag,
			favoriteId: req.params.id
		}
	}).spread(function(tag, created) {
		db.favorite.findById(req.params.id).then(function(favorite) {
			favorite.addTag(tag).then(function() {
				res.redirect('/favorites/' + req.params.id + '/tags');
			});
		});
	});
});



// app.get('/tags/:id', function(req, res) {
// 	var tagId = req.params.id;
// 	// console.log(tagId);
// 	db.tag.findById(tagId).then(function(tag) {
// 		tag.getFavorites().then(function(favorites) {
// 			res.render('tagShowMovies', {
// 				favorites: favorites,
// 				tag: tag 
// 			});
// 		});
// 	});
// 	// .then(function(favorites) {
// 	// 	console.log(favorites);
// 	// 	res.render('tagShowMovies.ejs', {
// 	// 		favorites: favorites
// 	// 	});
// 	// });
// });

app.get('/tags', function(req, res) {
	db.tag.findAll().then(function(tags) {
		// console.log(tags);
		res.render('allTags.ejs', {
			tags: tags
		});
	});
});

app.get('/tag/:id', function(req, res) {
	db.tag.findAll({
		where: {favoriteId: id},
		include: [db.favorite]
	}).then(function(favorites) {
		res.render('tagShowMovies', {
			favorites: favorites
		})
	});
});

var movieSearchFormCtrl = require('./controllers/movieSearchForm');
app.use('/', movieSearchFormCtrl);



app.listen(3000);















