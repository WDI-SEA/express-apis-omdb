var express = require("express");
var app = express();
var request = require('request');
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.get("/results", function(req, res) {
	var search = req.query.search;
	request('http://www.omdbapi.com/?s='+search,function(error, response, body) {
  			if (!error && response.statusCode == 200) {
    		res.render("resultShow.ejs", { movieDetails: body});

  		}
	});
});

app.get("/movie/:imbdId", function(req, res) {
	request('http://www.omdbapi.com/?i='+ req.params.imbdId, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			res.render("movie.ejs", {movie: body});

		}


	});


	

});





app.listen(3000);