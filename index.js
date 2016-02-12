var express = require('express');
var db = require('./models');
var request = require('request');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({extended: false}));

var favorites = require("./controllers/favorites");
app.use("/favorites", favorites);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


app.get('/', function(req,res){
	 res.render('index.ejs');
});


app.get('/search', function(req,res){
	var searchTerm = req.query.s;

		var qs = {
			s: searchTerm
		};

		request({
			url: "http://omdbapi.com",
			qs: qs
		}, function(error, response, body){
				if (!error && response.statusCode ==200){
					var movieList = JSON.parse(body);
					res.render('search.ejs', {movieList: movieList});
				}
		});
//}
});

app.get('/show/:id', function(req, res){
	var movID = req.params.id;
	

	var qs = {
		i: movID
	};

	request({
		url: "http://omdbapi.com",
		qs: qs
	}, function(error,response, body){
			if(!error && response.statusCode ==200){
				var movieDat = JSON.parse(body);
				res.render('show.ejs', {movieDat: movieDat});
			}

	});
} );






app.listen(3000);