var express = require('express');
var app = express();
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded{extended: false}));

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var request = require('request');

var path = require('path');
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('/', function(req, res) {
	res.render('movieSearchForm/index.ejs');
})

app.get('/results', function(req, res) {
	var title = req.query.title;
	request(
		'http://www.omdbapi.com/?s='+title, 
		function(error, response, body) {
			if(!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				res.render('movieSearchResults.ejs', {
					movie: data
				});
			}
		}
	);
});

app.get('/details/:id', function(req, res) {
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

var movieSearchFormCtrl = require('./controllers/movieSearchForm');
app.use('/', movieSearchFormCtrl);

app.listen(3000);