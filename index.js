var express = require("express");
var ejsLayouts = require('express-ejs-layouts')
var request = require('request');

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('static'));

app.get("/", function(req, res) {
    var searchTerms = ['ghost', 'league', 'war', 'bear', 'fun', 'pizza']
    var randomTerm = searchTerms[Math.floor(Math.random() * 6)];
    var randomMovieId = 0;

  request('http://www.omdbapi.com/?s=' + randomTerm + '&type=movie', function (error, response, body) {
    var results = JSON.parse(body);
    if (!error && response.statusCode == 200 && results.Search ) {
      randomMovieId = results.Search[Math.floor(Math.random() * results.Search.length)].imdbID

      request('http://www.omdbapi.com/?i=' + randomMovieId + '&type=movie&plot=full', function (error, response, body) {
        var movie = JSON.parse(body);
        console.log(movie)
        if (!error && response.statusCode == 200&& movie ) {
          res.render('index', {randomMovie: movie});
        } else {
          res.render('index-safe')
        }
      });
    } else {
      res.render('index-safe');
    }
  });

  // res.render("index");
});

app.get("/movies", function(req, res) {
	var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query, function (error, response, body) {
    var data = JSON.parse(body);
    console.log(data)
    if (!error && response.statusCode == 200 && data.Search) {
      res.render("movies", {movies: data.Search, q: query});
    } else {
    	res.render('index');
    }
  });
});

app.listen(3000);