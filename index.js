var express = require("express");
var ejs = require("ejs");
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

//-----ROUTES----->
app.get("/", function(req, res) {
  res.render("index");
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
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID + "&tomatoes=true", function(err, response, body) {
    res.render('movie-show', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});

//-----END-ROUTES----->

app.listen(3000);