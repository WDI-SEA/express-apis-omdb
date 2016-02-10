var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", 'ejs');
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
var request = require('request');
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
				movielist: JSON.parse(body)

				});
			}
		});

});

app.get('/results/:imdbID', function (req, res){
	var movieIndex = req.params.imdbID;
	request("http://www.omdbapi.com/?i="+movieIndex+"&y=&plot=full&r=json",
	function(error, response, body){
		if (!error && response.statusCode == 200){
			res.render('show.ejs', {
			movieData: JSON.parse(body) 
			});
		}
	});
});









app.listen(3000);