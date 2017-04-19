var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 
var fs = require("fs"); 
var ejsLayouts = require("express-ejs-layouts"); 
var request = require("request"); //enables XMLHttp Requests (e.g., like AJAX)

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false})); 
app.set("view engine", "ejs"); 
app.use(ejsLayouts);
app.use(express.static('public'));



//ROUTES 

app.get('/', function(req, res) {
  res.render('index');
});

var queryInput;

app.get('/results', function(req, res){
	queryInput = {
		s: req.query.q, // * WHY QUERY?
		plot: 'short',
		r: 'json'
	}
  
	request({
    	url: 'http://www.omdbapi.com/',
    	qs: queryInput // * WHY QS?
	}, 
	function(error, response, body){
    	var data = JSON.parse(body);
    	if(!error && response.statusCode == 200){
    		res.render('results', {movies: data.Search}); // * WHY SEARCH?
    		res.send('<h1>Results for '  + queryInput +  '</h1>'); //** how could i do this?
    	} 
    	else {
    		res.send("Error");
    	}
  });
});






var server = app.listen(process.env.PORT || 3000);

module.exports = server;
