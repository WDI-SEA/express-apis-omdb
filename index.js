//Requires & Global Variables
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var app = express();

//Set & Use Statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));

//Routes
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/results', function(req, res){
	var userInput = req.query.movie
	var qs = {
		s: userInput
	};

	request({
		url: 'http://www.omdbapi.com',
		qs: qs
	}, function(error, response, body){
		if(!error && response.statusCode == 200){
			var dataObj = JSON.parse(body);
			res.render('results', {results: dataObj.Search})
		}
	});
});

app.get('/details/:imdbID', function(req, res){
	var imdbID = {
 		i: req.params.imdbID
 	};
 	request({
 		url: "http://www.omdbapi.com",
 		qs: imdbID
 		
 		
 	}, function(error, response, body) {
 		if (!error && response.statusCode === 200) {
 			var moreInfo = JSON.parse(body);
 			res.render('details', {info: moreInfo});
 		} else {
 			res.send('Did not work');
 		}
 	});	
 
 });

//Listen 
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
