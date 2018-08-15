// require needded modules
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');

// Declare a new express app
var app = express();

// Tell express what view engine we want to use
app.set('view engine', 'ejs');

// Define middleware settings
app.use(expressEjsLayouts);

// this adds some logging to each request
app.use(require('morgan')('dev'));



// Declare routes
// app.get('/', function(req, res) {
// 	//console.log('reached about home');
// 	res.send('Hello Backend!');
// });
app.get('/', function(req,res){
	request('http://www.omdbapi.com?apikey=1836f10f&s=Star+Wars', function(err, response, body){
		if(!err && response.statusCode === 200){
			var parsedJson = JSON.parse(body);
			res.render('home',{movies:parsedJson.Search});
		} else {
			res.render(err);
		}
		});
		
});
//
app.get('/about', function(req,res){
	//console.log('reached about page');
	var name = 'ME';
	var foods = ['sushi', 'cheese', 'coconuts', 'BBq'];
	res.render('about', {myname: name, myfoods: foods})
});

// Listen on port 3000
//var server = app.listen(process.env.PORT || 3000);
//module.exports = server;
app.listen(3000);

