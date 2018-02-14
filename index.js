var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index');
  console.log("this is coming from the GET /index route...");
});

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
      console.log(dataObj);
      res.render('results', {movies: dataObj.Search});
    }
  })
});

app.get('/movies/:ids', function(req, res) {
  var qs = {
    i: req.params.ids
  };
  console.log(qs);
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200){
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render('details', {movie: dataObj});
    }
  });
});

app.listen(3000);
