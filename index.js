var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);

app.get('/', function(req, res){
	res.render('index');
})

app.get('/movies', function(req, res){
	var searchTerm = req.query.q ? req.query.q : '';

	request('http://www.omdbapi.com/?s=' + searchTerm, function(error, response, body){
		if(!error && response.statusCode == 200){
			var movieList = JSON.parse(body);
			res.render("results", {movieList: movieList,
														 searchTerm: searchTerm});
		}else{
			res.render('error');
		}
	})
})

app.get('/movie/:id', function(req, res){
	var searchID = req.params.id;

	request('http://www.omdbapi.com/?i=' + searchID, function(error, response, body){
		if(!error && response.statusCode == 200){
			var movieData = JSON.parse(body);
			res.render("movie", {movieData: movieData,
													 searchID: searchID});
		}else{
			res.render('error');
		}
	})
})

var moviesCtrl = require('./controllers/movies');
app.use('/movies', moviesCtrl);
var favoritesCtrl = require('./controllers/favorites');
app.use('/favorites', favoritesCtrl);

app.listen(3000);