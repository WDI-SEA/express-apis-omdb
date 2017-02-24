// require statements & global variables
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayout = require('express-ejs-layouts');
var request = require('request');
var app = express();


// set and use statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded( {extended:false} ));
app.use(ejsLayout);

//app.use('/movies', require('/controllers/movies'));

// routes
app.get('/', function(req, res) {
	res.render('home'); // render a view
});
app.get('/search', function(req, res){
	var s = req.query.search;
	console.log(s);
	request ({
		url: 'http://www.omdbapi.com/',
		qs: {s: s},
		r: 'json'
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieData = JSON.parse(body)['Search'];
			// console.log(movieData);
			res.render('results', { movieData: movieData } );
		}
	});
});
app.get('/movie/:movieId', function(req, res) {
	// console.log(req.params);
	var i = req.params['movieId'];

	request ({
		url: 'http://www.omdbapi.com/',
		qs: {i: i},
		r: 'json'
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);
			// console.log(movieData)
			res.render('id', { movieData:movieData });
		}
	});
});




// listen
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
