var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();




app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/results', function(req, res) {
	var searchInput = {
		s: req.query.searchInput
	};
	request({
		url: "http://www.omdbapi.com",
		qs: searchInput
	},
	function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			// res.send(movieData.Search);
			res.render('./results', { movies: movieData.Search })
		}
		else {
			res.send('An error happened ' + error);
		}
	});
});

app.get('/movies/:imdb', function(req, res) {
	var imdbID = {
		i: req.params.imdb
	};
	request({
		url: "http://www.omdbapi.com",
		qs: imdbID
		
		
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var movieData = JSON.parse(body);
			res.render('./movies.ejs', { movie: movieData });
		} else {
			res.send('This is not a real movie');
		}
	});	

});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
