//Require statements && global variables
var express = require("express");
var ejs = require("ejs");
var request = require("request");
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var app = express();

// Set and use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

// EXTERNAL ROUTE
app.use("/results", require("./controllers/results"));

// Routes
app.get("/", function(req, res) {
	res.render("home");
});

// app.get("/movies", function(req, res) {
// 	res.render("movies");
// })

app.get("/movies/:imdbID", function(req, res) {
	console.log(req.params.imdbID);
	var qs = {
		i: req.params.imdbID
	};
	request({
		url: 'https://www.omdbapi.com',
		qs: qs
	}, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var dataObj = JSON.parse(body);
			// Uncomment to test
			// res.send(dataObj);
			res.render("movies", {movieInfo: dataObj})
		}
	});
});
// LISTEN
app.listen(3000);