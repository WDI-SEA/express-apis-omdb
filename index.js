var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
//var peopleCtrl = require("./controllers/people")
var request = require('request');
var db = require("./models")

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/views'))


app.get('/', function(req, res) {
	res.render('index');
});
 
app.get("/movies", function(req, res) {
	var query = req.query.q;
 //  	var qs = {
	//    	s: 'indiana jones'
	// };

	request('http://www.omdbapi.com/?s=' + query, function (err, response, body) {
	    var data = JSON.parse(body);
	    if (!err && response.statusCode == 200 && data.Search) {
	      	var results = data.Search;
	      	console.log(results);
	      	res.render("movies", {movies: data.Search, 
	      							q: query});
		} else {
			res.render('error');
		}
	});	
});

app.get("/movies/:imdbID", function(req, res) {
	var imdbID = req.params.imdbID;
	var searchQuery = req.query.q ? req.query.q: "";
	request('http://www.omdbapi.com/?i=' + imdbID, function (err, response, body) {
		res.render('movies-show', {movie: JSON.parse(body), 
									q: searchQuery});
	}); 
});

app.get('/favorite', function(req, res) {
	
	db.favorite.findAll().then(function(favorites) {
		console.log(favorites);
		favorites = [{title: "star wars"}, {title:"fido goes west"}]
		res.render("favorite", {favorites: favorites});
	});
});




// app.post

app.listen(3000);




























//direct all traffic at url "/people"
//to the people controller
//app.use("/people", peopleCtrl);



// app.get("/", function(req, res) {
//   	res.render("index", {title: "Favorite Foods", foods: ["sandwich", "corn dog"]})
// });

// app.get("/animals", function(req, res) {
//   	res.render("animals", {title: "Favorite animals", animals: ["sand crab", "bog dog"]})
// });








// app.get("/lyrics", function(req, res) {
// 	var queryStringObj = {
//   		s: 'star wars'
// 	};

// 	request({
//   		url: 'http://www.azlyrics.com/lyrics/daftpunk/aroundtheworld.html',

// 	}, function (error, response, body) {
//  		if (!error && response.statusCode == 200) {
//     	var start = body.indexOf("<!-- Usage of azlyrics.com content by any third-party l
// backspace   yrics provider is prohibited by our licensing agreement. Sorry about that. -->")
//     	var end = body.indexOf("<!-- MxM banner -->")
//     	var lyrics = body.substr(start, end);
//     		res.send(lyrics);
//   		}
// 	});
// });

















