var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
require('dotenv').config();

app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('home');
});

var userSearch = null;
app.get('/results', function(req, res) {
  var qs = {
    s: req.query.title
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      // console.log(dataObj);
      res.render('results', {movies: dataObj.Search});
    }
  });
});

app.get('/movies/:movie_id', function (req, res) {
  var qs = {
    i: req.params.movie_id
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      console.log("~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!this is the body of the response!!!!!!!!!!!!!!!!!~~~~~~~~", body);
      res.render('movie', {movie: body})
    }
  });
});

app.listen(3000);










// These were already in here from the deliverable

// this adds some logging to each request
// app.use(require('morgan')('dev'));
// var server = app.listen(process.env.PORT || 3000);
// module.exports = server;
