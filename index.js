var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "css")));

app.get('/results', function(req, res) {
  res.render('results');
});

app.get('/', function(req, res) {
  res.render('index');
})

app.post('/results', function(req, res) {
  var titleStr = {s: req.body.title};
  request({
    url: 'http://www.omdbapi.com/?apikey='+process.env.OMDB_KEY+'&',
    qs: titleStr
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('results', {movies: dataObj.Search});
    }
  })
});

app.get('/movies/:idx', function(req, res) {
  var imd = {i: req.params.idx};
  console.log(imd);
  request({
    url: 'http://www.omdbapi.com/?apikey='+process.env.OMDB_KEY+'&',
    qs : imd
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      console.log(movieData);
      res.render('movies', {movie: movieData})
    }
  });
});

app.listen(3000);
