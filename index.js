var express = require("express");
var db = require("./models");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs")

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.get("/", function(req, res){
	res.render("index");
});

app.get("/favorites", function(req,res) {
	db.favorite.findAll().then(function(favorites){
		res.render("favorites.ejs", {
			favorites: favorites
		});
	});
});



app.post("/favorites", function(req, res){
	var fav = req.body;
	// console.log(fav);
	if (fav.title) {
		db.favorite.create({
			imdbCode: fav.id,
			movieTitle: fav.title,
			movieYear: fav.year
		}).then(function(blah){
			res.redirect('/favorites');
		})
	}
});

app.get("/movies", function(req, res) {
  var query = req.query.q;
  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search,
                            q: query});
    } else {
      res.render('error');
    }
  });
});



app.get('/movies/:imdbID', function(req, res) {
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movieShow', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});

app.listen(3000);