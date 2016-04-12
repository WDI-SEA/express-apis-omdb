var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get("/", function(req, res) {
  res.render('index');
});

 // app.get("/movies", function(req, res) {
 //  var query = req.query.q;

 //  console.log(query);

 //  request({
 //    url: 'http://www.omdbapi.com/?s=' + query, function (error, response, body) {
 //      var dataObj = JSON.parse(body);
 //      if (!error && response.statusCode == 200 && data.Search) {
 //        res.render("movies", {movies: data.Search,
 //                                      q: query});
 //      } else {
 //        res.render('error');
 //      }
 //    });
 //  });

  // ?q=Star+Wars

  //post = req.body

app.listen(3000);