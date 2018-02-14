var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();

// this adds some logging to each request
app.use(require('morgan')('dev'));
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) { // hit the results route
  res.render('index');
});

app.get('/results', function(req, res) {
  // res.send('Hello Backend!');
  var qs = {
    s: req.query.search
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.send(dataObj);
      //res.render('results', {movies: dataObj});
    }
  });
});

app.get('/movie/:movie_id', function(req, res) {
  var qs = {
    i: req.params.movie_id
  };
  request( {
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      //res.send(dataObj);
      res.render('show', {movie: dataObj});
    }
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
