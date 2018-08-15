var express = require('express');
var expressEjsLayout = require('express-ejs-layouts');
var request = require('request');
var querystring = require('querystring');

var app = express();

// this adds some logging to each request
app.use(require('morgan')('dev'));

app.set('view engine', 'ejs');

app.use(expressEjsLayout);

app.get('/', function(req, res) {
	res.render('home')
});

app.get('/results', function(req, res) {
	var search = req.query.movie
	request('http://www.omdbapi.com/?apikey=61a60f65&s='+search, function(err, response, body){
		if(!err && response.statusCode === 200){
			console.log(body);
			var parsedJson = JSON.parse(body);
			res.render('results', { movies: parsedJson.Search });
			//res.send(parsedJson);
		}
		else {
			res.send(err)
		}
	}); 
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;