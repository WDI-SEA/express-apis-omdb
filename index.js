var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use("/public",express.static(__dirname + "/public"));

app.use( bodyParser.urlencoded({extended: false}) );


app.get("/", function(req, res) {
  res.render('index');
});

app.get("/movies", function(req, res) {
  var query = req.query.q;
    request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
      var data = JSON.parse(body);
      if (!err && response.statusCode === 200 && data.Search) {
        res.render('movies', {movies: data.Search, 
                                      q: query});
      } 
    });
  });
  
  app.get('/movies/:imdbID', function(req, res){
    var searchQuery = req.query.q ? req.query.q : '';
    var imdbID = req.params.imdbID;
      request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
        res.render('show', {movie: JSON.parse(body)});
      });
    });
 
app.listen(3000);