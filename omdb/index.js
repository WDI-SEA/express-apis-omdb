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

app.get('/movies/favorites', function(req, res) {// does this have to be favorites? btw "x/x/x" is called route
  db.favorite.findAll().then(function(favs) {
    res.render('favPage', { // this is the visial page that gets the info dumped into
      allFavs: favs //this is where the app.post info goes 
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
  db.favorite.find({// this is called a db query, WHAT IS DIFF BETWEEN FIND OR CREATE AND JUST CREATE AS I HAVE HERE, added findOrCreate which is always safer
    imdb_code: req.body.imbd_id,// req.body is taking any input and storing it, it's apart of body parser
    title: req.body.title,
    year: req.body.year
  }).then(function(saved) {
    res.redirect('/movies/favorites');///movies/favorires is url parth
  }); //this seems to work fine even though we mentioned in class we should utilze .spread to ensure that the page doesn't post till the info is there. 
});

app.get('/favorites/:id/comments', function(req, res) {
  var favoriteId = req.params.id;
  db.favorite.find({
    where: {id: favoriteId},
    include: [db.comment]
  }).then(function(fav) {
    res.render('comments', {favorite: fav});
  });
});

app.post('/favorites/:id/comments', function(req, res) {
  db.comment.create({
    content: req.body.content,
    author: req.body.author,
    favoriteId: req.params.id
  }).then(function() {
    res.redirect('/favorites/' + req.params.id + '/comments');
  });
});

app.get('/favorites/:id/tags', function(req, res) {
  var favoriteId = req.params.id;
  db.favorite.find({
    where: {id: favoriteId},
    include: [db.tag]
  }).then(function(taggy) {
    res.render('addTag', {tag: taggy, id: favoriteId}); //I don't understand what is to the left of : here. what is tag and taggy. I know that that taggy is thrown into the fuction above, but why.
  });
});

app.post('/favorites/:id/tags', function(req, res) {
  db.tag.create({
    tag: req.body.word,
    favoriteId: req.params.id
  }).then(function() {
    res.redirect('/favorites/' + req.params.id + '/tags');
  });
});

app.get('/tags', function(req,res) {
  res.render('allTags');
});

app.get('/tags/:id', function(req, res){
 res.render('movieTags')
});


app.listen(3000);
