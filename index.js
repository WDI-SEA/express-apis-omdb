var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use('/static', express.static('public'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

var request = require("request");

// app.get("/", function(req, res) {
// 	res.send("Your server works!");
// })

//Render the index.ejs page where a user can search for movies
app.get("/", function(req, res) {
	res.render("index.ejs");
});

//Render the search results page
app.get('/movies', function(req, res) {
  var query = req.query.q
    request('http://www.omdbapi.com/?s=' + query, function (error, response, body) {
      var data = JSON.parse(body);
      if (!error && response.statusCode == 200) {
      res.render("movies.ejs", {movies: data.Search, q: query});
      } else {
        res.send("Error!")
      }
  });
});

//Render the individual movie results pages
app.get('/movies/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID
    request('http://www.omdbapi.com/?i=' + imdbID, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render("showMovie.ejs", {movie: JSON.parse(body), q: searchQuery});
    } else {
        res.send("Error!")
    } 
  });
});

app.listen(3000);
