var express = require('express');
var request = require('request');
var app = express();


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

var searchTerm = "";
//app.use(require('morgan')('dev'));

app.set("view engine", "ejs");
//app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render("index");
});

app.post('/search', function(req, res){
  searchTerm = req.body.search;
  res.redirect('/results');
});

app.get("/results", function(req, res){
  var qs = {
    s: searchTerm,
    plot: 'short',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, 
  function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render("results", {results: data.Search});      
    }
    else{
      res.send("request failed, try another search");
    }
  });
});

app.get("/id/:imdbID", function(req, res){
  console.log(req.params.imdbID);
  var qs = {
    i: req.params.imdbID,
    plot: 'full',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  },
  function(error, response, body){
    if(!error && response.statusCode == 200){
      var movie = JSON.parse(body);
      console.log(movie);
      res.render("id", {movieData: movie})
    }
    else{
      res.send("bad movie ID, try again");
    }
  });
  //res.render("id", {movieID: req.params.imdbID});
});



var server = app.listen(process.env.PORT || 3000);

module.exports = server;
