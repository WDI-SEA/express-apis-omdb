var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('main.ejs');
});

app.get('/results', function(req, res) {
  // how I get my query value
  // res.send(req.query.searchTerm);

  request({
    url: 'http://www.omdbapi.com/',
    qs: {
      s: req.query.searchTerm
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      res.render('results.ejs', { movies: movieData.Search });
    } else {
      res.send('Error');
    }
  });
});

app.get('/movies/:imdbId', function(req, res) {
  res.send('This is /movies/:imdbId');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
