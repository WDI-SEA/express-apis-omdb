// REQUIREMENTS
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var fs = require('fs');

// GLOBAL VARIABLES
var app = express();

// SET/USE STATEMENTS
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// ROUTES
app.get('/', function(req, res) {
  res.render('movies/index');
});

app.get('/results', function(req, res) {
  //console.log(req.query);
  var qs = {
    s: req.query.search
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body) {
    var data = JSON.parse(body);
    res.render('movies/results', {results: data.Search});
  });
});

app.get('/movie/:imdbId', function(req, res){
  var qs  =  {
    i: req.params.imdbId
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body) {
    var data = JSON.parse(body);
    //console.log(data);
    res.render('movies/show', {movieData: data});
  });
});

app.get('/movie/favorites', function(req, res) {
  var jsonData = JSON.parse(fs.readFileSync('./favorites.json', 'utf8'));
  res.render('favorites', {favorites: jsonData.favorites});
});

app.post('movies/favorites', function(req, res){
  var jsonData = JSON.parse(fs.readFileSync('./favorites.json', 'utf8'));
  jsonData.favorites.push(req.body);
  fs.writeFileSync('./favorites.json', JSON.stringify(jsonData));
  res.redirect('/favorites');
});

// LISTEN
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
