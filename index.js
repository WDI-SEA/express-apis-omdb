var express = require("express");
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

var favoriteCtrl = require("./controllers/favorites")
app.use("/favorites", favoriteCtrl);

app.set("view engine", 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));


app.get("/", function(req,res){
  res.render("index.ejs");
});

app.get('/results', function(req, res){
	var searchTerm = req.query.title;
	request("http://www.omdbapi.com/?s="+searchTerm+"&y=&plot=full&r=json",
		function(error, response, body){
			if (!error && response.statusCode == 200){
				res.render('results.ejs', {
				movielist: JSON.parse(body),
				title: searchTerm
				});
			}
		});

});

app.get('/results/:imdbID', function (req, res){
	var movieIndex = req.params.imdbID;
	var searchTerm = req.query.title ? req.query.q : '';
	request("http://www.omdbapi.com/?i="+movieIndex+"&y=&plot=full&r=json",
	function(error, response, body){
		if (!error && response.statusCode == 200){
			res.render('show.ejs', {
			movieData: JSON.parse(body), 
			title: searchTerm, 
			imdbID: movieIndex
			});
		}
	});
});





app.listen(3000);