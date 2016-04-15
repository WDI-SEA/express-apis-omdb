var express = require("express");
var bodyParser = require("body-parser");
var db = require('./models');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));




app.get("/", function(req, res) {
  res.render("index");
});

app.post("/favorites", function(req,res){
  db.favorites.create({
    imdbID:req.body.imdbID,
    title:req.body.titleFav,
    year:req.body.yearFav
  }).then(function(favorite){
    res.send("success!")
  })
  console.log(req.body);
});



app.get("/favorites", function(req,res){
  db.favorites.findAll().then(function(movies) {
    res.render("favorites", {movies: movies});
  console.log(movies);  
  });
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