var express = require("express");
var ejsLayouts = require("express-ejs-layouts")
var request = require("request");

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + 'static'));

app.get('/', function(req, res) {
	res.render('index.ejs');
})

app.get('/movies', function(req, res) {
	var query = req.query.q;

	request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
		var data = JSON.parse(body);
		if (!err && response.statusCode === 200 && data.Search) {
			var results= data.Search;
			res.render("movies", {results: results})
		} 
	})
});

app.get('/movies/:imdbID', function(req, res) {
	var searchQuery = req.query.q ? req.query.q : '';
	var imdbID = req.params.imdbID;

	request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
		res.render('movieDescrip.ejs', {movie: JSON.parse(body), q: searchQuery});
	})


})



app.listen(3000);