var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var db = require('./models'); //every model represents a table in our table base
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));

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
  var tag = req.query.tag;
  console.log("tag:", tag);

  if (tag) {
    db.tag.find({where: {name: tag}}).then(function(tag) {
      tag.getFavorites().then(function(favorites) {
        res.render('favorites', {favorites: favorites});
      });
    });
  } else {
    db.favorite.findAll().then(function(favorites) {
      res.render('favorites', {favorites: favorites});
    });
  }
});

app.post('/favorites', function(req, res) {
  var newFavorite = req.body;

  db.favorite.create(newFavorite).then(function(favorite) {
    res.status(200).send('Created Favorite');
  });
});

app.get('/favorites/:imdbId/comments', function(req, res) {
  db.favorite.findOne({where: {imdbId: req.params.imdbId}}).then(function(favorite) {
    favorite.getComments().then(function(comments) {
      request('http://www.omdbapi.com/?i=' + req.params.imdbId, function(err, response, body) {
        res.render('comments', {movie: JSON.parse(body),
                                comments: comments});
      });
    });
  });
});

app.post('/favorites/:imdbId/comments', function(req, res) {
  var comment = req.body;
  console.log("comment:", comment);

  db.favorite.findOne({where: {imdbId: req.params.imdbId}}).then(function(favorite) {
    favorite.createComment(comment).then(function(comment) {
      //res.redirect('/favorites/' + req.imdbId + '/comments');
      res.redirect(req.url);
    });
  })
});

app.get('/tags', function(req, res) {
  db.tag.findAll().then(function(tags) {
    res.render("tags", {tags: tags});
  });
});

app.get('/favorites/:imdbId/tag', function(req, res) {
  res.render('tag', {imdbId: req.params.imdbId});
});

app.post('/favorites/:imdbId/tag', function(req, res) {
  var tag = req.body;
  console.log("tag:", tag);

  db.tag.findOrCreate({where: {name: tag.name}}).spread(function(tag, isCreated) {
    db.favorite.findOne({where: {imdbId: req.params.imdbId}}).then(function(favorite) {
      favorite.addTag(tag);
      res.redirect('/favorites?tag=' + tag.name);
    });
  });
});

var port = 3000;
app.listen(process.env.PORT || port);