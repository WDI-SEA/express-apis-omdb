var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var db = require('./models'); //every model represents a table in our table base
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/movies', function(req, res) {
  var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search, q: query});
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

app.get('/favorites', function(req, res) {
  db.favorite.findAll().then(function(favorites) {
    res.render('favorites', {favorites: favorites});
  });
});

app.post('/favorites', function(req, res) {
  var newFavorite = req.body;

  db.favorite.create(newFavorite).then(function(favorite) {
    res.status(200).send('Created Favorite');
  });
});

//comments


// app.get('/favorites/:imdbID/comments'), function(req, res) {
//   db.comment.findOne({where: {imdbID: req.params.imdbID}}).then(function(favorite) {
//     db.favorite.findOne({where: {imdbID}})

//   })
// }

var port = 3000;
app.listen(process.env.PORT || port);