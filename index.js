// Require needed modules
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');

// Declare a new express app
var app = express(); 

// Tell express what view engine we want to use
app.set('view engine', 'ejs'); 

// Define middleware settings
app.use(expressEjsLayouts);

// this adds some logging to each request
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
	res.render('home');

});

app.get('/results', function(req, res) {
    var query = req.query.results;
	console.log("query is ", req.query.results);
    	request('http://www.omdbapi.com?apikey=fa0e598d&s=' + query, function(err, response, body){
		if(!err && response.statusCode===200){
			var parsedJson = JSON.parse(body);
			console.log(parsedJson.Search)
			res.render('results', {movies: parsedJson.Search});
		}
		else{
			res.send(err);
		}
	})
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
