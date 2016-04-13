
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/movies', function(req, res) {
  var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query, function(error, response, body) {
   
    if (!error && response.statusCode === 200) {
       var data = JSON.parse(body);
       var results = data.Search;
       res.render('movies', {results: results});
    } 
  });
});

app.get('/movies/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(error, response, body) {
    res.render('movies/details', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});

var port = 3000
app.listen(port) 







