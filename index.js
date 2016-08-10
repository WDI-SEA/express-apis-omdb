var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var request = require('request')
var fs = require("fs");
var bodyParser = require("body-parser");



app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));




app.get('/', function(req, res) {
	res.render('site/index');
});

app.get('/raw', function(req, res) {
	var qs = {
		s: 'star wars'
	};

	request({
		url: 'http://www.omdbapi.com',
		qs: qs
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var dataObj = JSON.parse(body);
			res.send(dataObj.Search);
		}
	});
});

app.get('/results', function(req, res) {
	var searchTerm = req.query.searchTerm; 
	var qs = {
		s: searchTerm
	};

	request({
		url: 'http://www.omdbapi.com',
		qs: qs
	}, function(error, response, body) {
		      var dataObj = JSON.parse(body);

			res.render("site/results", {results: dataObj.Search});
	});
});

app.post('/results', function(req,res){
   //console.log(req.body);
   fs.writeFileSync('data.json', JSON.stringify(req.body));
   res.redirect('/results');
 });

app.get('/movie/:imdbID', function(req, res){
 
   var qs = {
     i: req.params.imdbID,
     plot: 'long',
     r: 'json'
   }
   console.log(qs);
   request({
     url:'http://www.omdbapi.com/',
     qs: qs
   }, function(error, response, body){
      var data = JSON.parse(body);
      console.log({myMovies: data.Plot});
     res.send(dataObj);
   }); 
 
 });

var server = app.listen(process.env.PORT || 3000);

module.exports = server;