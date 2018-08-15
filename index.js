var express = require('express');
var request = require('request');
var expressEjsLayouts = require('express-ejs-layouts');
var app = express();

// Define middleware
app.use(expressEjsLayouts);

// Define view engine
app.set('view engine', 'ejs');

// this adds some logging to each request
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/results', function(req, res) {
  request('http://omdbapi.com/?apikey=2298edeb&s=' + req.query.title, function (err, resp, body) {
        var parsedJson = JSON.parse(body);
        res.render('results', {movies: parsedJson.Search} );
        //res.send(parsedJson.Search);      
  });
});
app.get('/movies/:movieId',function (req, res) {
  request('http://omdbapi.com/?apikey=2298edeb&i=' + req.params.movieId, function (err, resp, body) {
        var parsedJson = JSON.parse(body);
        res.render('movies', {movie: parsedJson} );
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
