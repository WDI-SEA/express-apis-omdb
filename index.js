var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

//app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

/////////////////// HOME PAGE
app.get("/", function(req,res){
  res.render("index");
});

/////////////////// RESULTS
app.get("/results", function(req, res){
  var fileContents = fs.readFileSync('data.json');
  var data = JSON.parse(fileContents);
  console.log(data.title);
  var qs = {
    s: data.title
    //r: 'json'
  }
  request({
    url:'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    var dataObj = JSON.parse(body);
    res.render("results", {results: dataObj.Search});
  }); 
});

//////////////////// POST 
app.post('/results', function(req,res){
  //console.log(req.body);
  fs.writeFileSync('data.json', JSON.stringify(req.body));
  res.redirect('/results');
});

//////////////////// MOVIES
app.get('/movies/:imdbID', function(req, res){
  //res.render('movies', {results: dataObj[parseInt(req.params.imdbId)]});
  console.log("parse " + req.params.imdbID);

  var qs = {
    i: req.params.imdbID
    //r: 'json'
  }
  request({
    url:'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
     var data = JSON.parse(body);
     console.log({myMovies: data.Plot});
    res.render("movies", {myMovies: data.Plot});
  }); 

});

////////////////// Listener
var server = app.listen(process.env.PORT || 3000);
module.exports = server;

















