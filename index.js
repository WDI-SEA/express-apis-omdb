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

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.get('/results', function(req, res) {
  var searchResult = req.query.search
    request({
      url: 'http://www.omdbapi.com/?s=' + searchResult,
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movies = JSON.parse(body);
      res.render("results.ejs", {movies: movies});
    }
  });
});

app.listen(3000);
