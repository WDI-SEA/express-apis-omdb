var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");

app.use(ejsLayouts);

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("index")
});

app.get('/movies', function(req, res) {
  var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      var results = dataObj.Search;

      res.render("movies", {results: results});
    }
  });
});

app.get('/movies/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movies/show', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});
app.listen(3000);