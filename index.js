var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));


app.get("/", function(req, res) {
  res.render('index');
});

app.get("/movies", function(req, res) {
  var query = req.query.q;
  //console.log(query);
  var qs = {
    s: query
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var results = data.Search;
        res.render("movies", {results: results});
      } else {
        res.render('error');
      }
  });
});

app.get("/movies/:imdbID", function(req, res) {
  var imdbID = req.params.imdbID;
  var qs = {
    i: imdbID
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body) {
      var data = JSON.parse(body);
      console.log(data);
      res.render("show", {movie: data});
  })
});

app.get("/favs", function(req, res) {
  db.favorite.findAll().then(function(favMovies){
  res.render('favs', {favMovies: favMovies});
});
});

app.post("/favs", function(req, res) {
  var favMovie = {imdbId: req.body.imdbID, 
                  title: req.body.title, 
                  year: req.body.year};

  db.favorite.create(favMovie).then(function(movie){
    console.log(movie);
    res.redirect('/favs');
  });
});




app.listen(3000);