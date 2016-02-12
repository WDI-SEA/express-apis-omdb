var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var db = require('./models'); //every model represents a table in our table base
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));




app.get('/', function(req, res) {
  res.render('index');
});

app.get('/movies/favorites', function(req, res) {
  db.favorite.findAll().then(function(favs) {
    res.render('favPage', {
      allFavs: favs
    });

  });
});

app.get('/movies', function(req, res) {
  var query = req.query.q;
  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search,
                            q: query});
    } else {
      res.render('error');
    }
  });
});

app.get('/movies/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movieShow', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});

app.post('/getFavs', function(req, res) {
  db.favorite.create({// this is called a db query
    imdb_code: req.body.imbd_id,// req.body is taking any input and storing it, it's apart of body parser
    title: req.body.title,
    year: req.body.year
  }).then(function(saved) {
    res.redirect('/movies/favorites');///movies/favorires is url parth
  });
});

app.listen(3000);