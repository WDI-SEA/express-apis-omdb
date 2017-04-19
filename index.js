var express = require('express');
var app = express();
var request = require("request");
var bodyParser = require("body-parser");


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/results", function(req, res) {
  console.log(req.query);
  var searchInput = {
    s: req.query.searchInput
  };

  request({
    url: "http://www.omdbapi.com",
    qs: searchInput
  },
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieData = JSON.parse(body);
      res.render("results", { movies: movieData.Search });
    } else {
      res.send("An error happened: " + error);
    }
  });
});

app.get("/movies/:imdbID", function(req, res) {
  var imdbID = req.params.imdbID;

  request({
    url: 'http://www.omdbapi.com',
    qs: {
      i: imdbID,
     }
     }, function(error, response, body) {
         if (!error && response.statusCode === 200) {
             var movieData = JSON.parse(body);
             res.render("movies", { movie: movieData });
         } else {
             res.send("Sorry, this movie is not in our database.");
         }
     });
 });

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
