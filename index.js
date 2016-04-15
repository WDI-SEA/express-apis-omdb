var express = require("express");
var ejsLayouts = require("express-ejs-layouts")
var request = require("request");
var db = require('./models')



var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + 'static'));

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
	}).then(
		res.redirect('/favorites'));
});

app.delete("/favorites/:imdbID", function(req, res) {
	var imdbID = req.params.imdbID;
	db.favorite.destroy({where: {imdbID: imdbID}}).then(function() {
		res.send({'msg': 'success'});
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