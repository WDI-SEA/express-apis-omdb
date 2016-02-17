//variables and requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var db = require('./models');

//initiate app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

//home page
app.get('/', function(req, res) {
	res.render('index');
});

//call to API & present results
app.get('/results', function(req, res) {
	var q = req.query.q;
	request("http://www.omdbapi.com/?s="+q, function(error, response, body) {   
    	if(!error && response.statusCode == 200) {
			var movies = JSON.parse(body);
			res.render("results/index.ejs", {
				movies: movies
			});
		}
	});
});

//controllers for linking to specific movie details
app.use('/movie', require('./controllers'));

//controllers for linking to favorites
app.use('/favorites', require('./controllers/favorites.js'));

//class example
app.use("/random", require("./controllers/random"));

app.listen(3000);