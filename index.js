var express = require('express');
var app = express();
var db = require("./models");
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded{extended: false}));

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var request = require('request');

var path = require('path');
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));


var favCtrl = require('./controllers/favorites.js');
app.use('/favorites', favCtrl);


app.get('/', function(req, res) {
	res.render('movieSearchForm/index.ejs');
})

app.get('/results', function(req, res) {
	var title = req.query.title;
	request(
		'http://www.omdbapi.com/?type=movie&s='+title, 
		function(error, response, body) {
			var data = JSON.parse(body);
			if(!error && response.statusCode == 200 && data) {
				res.render('movieSearchResults.ejs', {
					movie: data
				});
			} else {
				res.render('No movies found!');
			}
		}
	);
});

app.get('/details/:id', function(req, res) {
	// var searchQuery = req.query.q ? req.query.q : '';
	var id = req.params.id;
	request('http://www.omdbapi.com/?i='+id, 
		function(error, response, body) {
			if(!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				console.log(data);
				res.render('movieDetails.ejs', {
					movie: data
				});
			}
		}
	);
});


// app.post('/favorites', function(req, res) {
// 	var data = req.body;
// 	db.omdb_app.create({
// 		imdbID: data.imdbID,
// 		title: data.Title,
// 		year: data.Year,
// 		poster: data.Poster,
// 	}).then(function(){
// 		res.redirect('/favorites/index.ejs');
// 	})
// });


// need app.use controllers/favorites.js here



var movieSearchFormCtrl = require('./controllers/movieSearchForm');
app.use('/', movieSearchFormCtrl);



app.listen(3000);















