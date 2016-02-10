var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/results', function(req, res) {
	var search = req.query.search;
	request("http://www.omdbapi.com/?s="+search, function(error, response, body) {   
    	if(!error && response.statusCode == 200) {
			var movies = JSON.parse(body);
			res.render("results/index.ejs", {
				movies: movies
			});
		}
	});
});

app.use('/movie', require('./controllers'))


app.listen(3000);