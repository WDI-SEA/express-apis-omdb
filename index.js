var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var searchResult;

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static(__dirname + '/'));

app.get("/", function(req, res){
	res.render("index.ejs");
	
});


app.get("/show", function(req, res){
	searchResult = req.query.search;
	request(
		"http://omdbapi.com/?s="+searchResult, 
		function(error, response, body){
			if (!error && response.statusCode == 200) {
				res.render("show", {
					movieResult: JSON.parse(body)
				});
			} 
		}
	);
});

app.get("/show/movie/:imdbId", function(req, res){
	var id = req.params.imdbId;
	request(
		"http://omdbapi.com/?i="+id, 
		function(error, response, body){

			if (!error && response.statusCode == 200) {
				res.render("movie", {
					movieResult: JSON.parse(body),
					searchValue: searchResult
				});
			} 
		}
	);
});
	
	

app.listen(3000);