var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var request= require("request");
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/style'));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/movies", function (req, res) {
	var query = req.query.q; 
	console.log(req.query.q);

  var qs = {
    s: query
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      var results = dataObj.Search;
      console.log(results);
      res.render("movies", {results: results});
    }
  });
});

app.get("/movies/:imdbID", function (req, res){
	var imdbID = req.params.imdbID;

	request('http://www.omdbapi.com/?i=' + imdbID + '&tomatoes=true', function(error, response, body){
		var data = JSON.parse(body);
		res.render("shows", {movie: data});
		console.log(data);
	}); 
});

app.post('/favorites', function(req, res){
	db.favorite.create({
			IMDBCode: req.body.IMDBcode, 
			title: req.body.Title, 
			year: req.body.Year	
	}).then(function(){
		console.log("this works!");
		res.redirect("/");
	});
});

app.get("/favorites", function (req, res){
	db.favorite.findAll().then(function(favorites){
		console.log(favorites);
		res.render("favorites", {favorites: favorites});
	});
});



app.listen(3000);