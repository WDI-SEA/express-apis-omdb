var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

var app = express();
app.set('view engine', 'ejs');


app.use(ejsLayouts);




app.get("/", function(req, res) {
  res.render("index");
});



app.get("/movies", function(req, res) {
  var query = req.query.q;
  if (!query){
    console.log('nope');
    return false;
  }
  request('http://www.omdbapi.com?s=' + query, function(err, response, body) {
      var data = JSON.parse(body);
    if (!err && response.statusCode == 200 && data.Search) {
      var results = data.Search;
      res.render("movies", {results: results, q: query});
    } else {
      res.render('error')
    } 
  });
});

app.get('/movies/:imdb', function(req, res){
  request('http://www.omdbapi.com?i=' + req.params.imdb + "&tomatoes=true", function(err, response, body) {
      var data = JSON.parse(body);
      console.log(data);
    if (!err && response.statusCode == 200) {    
      res.render("movies/show", {result: data});
    } else {
      res.render('error')
    } 
  });
});

app.listen(3000);