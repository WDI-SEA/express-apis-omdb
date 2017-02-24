//require global vars
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();


//set and use statements
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));

app.get('/', function(req, res){
	res.render('search')
});

app.get('/results', function(req, res) {
	// var search = req.query.name
	var qs = {
		s: req.query.name
	};
	request({
		url:'http://www.omdbapi.com',
		qs: qs
	}, function(error, response, body){
		if (!error && response.statusCode == 200){
			var dataObj = JSON.parse(body);
			res.render('results', {results: dataObj.Search});
		}
	});
});



app.get('/movies/:id', function(req, res){
		var id = req.params.id
		var qs = {
		i: id
	};
	request({
		url:'http://www.omdbapi.com',
		qs: qs
	}, function(error, response, body){
		if (!error && response.statusCode == 200){
			var dataObj = JSON.parse(body);
			res.render('movies', {movies: dataObj});
		}
	});
});



var server = app.listen(process.env.PORT || 3000);
module.exports = server;

