var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));


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
      res.render("show", {results: results});
  })
});

app.get("/favorites", function(req, res) {
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
      res.render("favorites", {movie: data});
  })
});


app.listen(3000);