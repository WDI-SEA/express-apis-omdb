var express = require('express');
var app = express(); 
var request = require('request');
var bodyParser = require('body-parser');

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	console.log('we are in the get / route');
	res.render('index');
});

app.get('/results', function(req, res) {
	var queriesObj = {
		s: req.query.title
	}
	console.log('we are in the get /results route');
	request({
		url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
		qs: queriesObj
	}, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			var dataObj = JSON.parse(body);
			res.render('results', {movies: dataObj.Search});
		};
	});
});

app.get('/movies/:id', function(req, res) {
	console.log('we are in the get/results for link');
	var qs = {
		i: req.params.id
	}
	request({
		url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
		qs : qs
	}, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			var dataObj = JSON.parse(body);
			res.render('movies', {movie: dataObj})
		}
	})
});

app.listen(3000);
