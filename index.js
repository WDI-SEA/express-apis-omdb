var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(_dirname = "/static"));
console.log(_dirname);

var ejsLayout = require ("express-ejs-layouts");
app.use(ejsLayout);
//////////////////////////////////////////////////////////

app.get("/", function(req,res) {
  res.render('index.ejs');
});

//route that displays results from search
app.get("/result", function(req, res) {
	var searchResult = req.query.search;
	request(
		"http://omdbapi.com/?s=" + searchResult,
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.render("result.ejs", {
					movies: JSON.parse(body)
				})
			}	
		}
	)
})

//route that displays one movie result
app.get("/show/:id", function(req, res) {
	var id = req.params.id;
	request(
		'http://www.omdbapi.com/?i='+ id,
		 function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var movies = JSON.parse(body);
				console.log("*************",movies);
				res.render("show", {movies});
			}
		}
	)
});


//post route adds to favorites database
app.post('/favorites', function(req,res) {
	console.log(req.body)
	var favorite = req.body ;
	if (favorite.title) {
		db.favorite.create({ imdb: favorite.imdbId, year: favorite.year, title: favorite.title }).then(function(something) {
			res.redirect('/show/'+favorite.imdbId);
		}) 

	} else {
		res.send('Not a real movie.')
	}
})


//favorites page
app.get('/favorites', function(req,res) {
	db.favorite.findAll().then(function(fave) { 
		console.log(fave[0]);
		res.render('favorites.ejs', {fave:fave });
	})
})

//Lists all comments for a specific post
//Should list comments based on a URL parameter (favorite item id)
//Have a form to add a comment associated to that favorite item


//comments page for each movie
app.get('/favorites/:id/comments', function(req,res) {
	var id = req.params.id;
		db.favorite.find( {
		where: {id: id},
		include: [db.comment]
	}).then(function(fav) {
		//res.send(fav);
		res.render('comments.ejs', {favorites:fav})
	})
});

app.post('/favorites/:id/comments', function(req,res) {
	var id = req.params.id;
	db.favorite.findById(id).then(function(fave) {
		fave.createComment( {
			author: req.body.author,
			text: req.body.text
		}).then(function(comment) {
			res.redirect('/favorites/' +req.params.id + '/comments')
		})
	});
});


app.get('/tags', function(req,res) {
	db.tag.findAll().then(function(tag) {
		res.render('tags.ejs', {tag: tag})
	})
})

app.post('/tags', function(req,res) {
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

app.get('/favoritesbytag', function(req,res) {
	// db.favoritesTags.find( {
	// 	where
	// })
	res.render('favoritesbytag');
})

app.listen(3000);
console.log("woot!");