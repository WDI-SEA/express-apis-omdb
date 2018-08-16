var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

// this adds some logging to each request
app.use(require('morgan')('dev'));
app.use(expressEjsLayouts);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/results', function(req, res) {
	var movie = req.query.movie;
	request('http://www.omdbapi.com/?i=tt3896198&apikey=80baab41&s=${movie}', function(err, response, body) {
		if(!err && response.statusCode === 200) {
			let parsedJson = JSON.parse(body);
			res.render('results', {results: parsedJson.Search});
		} else {
			res.send(err);
		}
	});
})

app.get('/movies/:id')

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
