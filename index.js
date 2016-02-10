var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(_dirname = "/static"));
console.log(_dirname); // its a variable that node sets that gives you an absolute path to the directory you're in
//express.static wants an absolute path

var ejsLayout = require ("express-ejs-layouts");
app.use(ejsLayout);


//////////////////////////////////////////////////////////

app.get("/", function(req,res) {
  res.render('index.ejs');
});


//a form that sends a query and gets results from the OMDB API. 
app.get("/result", function(req, res) {
	var searchResult = req.query.search;

	request(
		"http://omdbapi.com/?s=" + searchResult,
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.render("result.ejs", {
					movies: JSON.parse(body)
				})

			}
		})
})

//route that takes parameters of imdbID in the url
app.get("/movies/:imbdID", function(req,res) {
	var id = req.params.imbdID;
	request(
		'http://www.omdbapi.com/?i='+ id, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.render('show.ejs', {
					movies: JSON.parse(body)
				})
			}
		})
});






app.listen(3000);
console.log("woot!");