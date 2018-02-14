var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('index');
})


app.get('/results', function(req, res) { // hit the /results route
  var qs = {
    s: req.query.title
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('results', { movies: dataObj.Search }); // change index to whatver your ejs file is called
    }
  });
});


app.get('/movies/:movie_id', function(req, res) {
  var qs = {
    i: req.params.movie_id
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('movie', { movies: dataObj }); // change index to whatver your ejs file is called
    }
  });
});







app.listen(3000);
