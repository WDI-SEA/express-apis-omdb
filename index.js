//Requires
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts')
var request = require('request');

//Variables
var app = express();
var apiKey = 'http://www.omdbapi.com/?apikey=34d9bb79&s='

//Tell express what view engine we want to use
app.set('view engine', 'ejs');

// this adds some logging to each request
app.use(require('morgan')('dev')); //<------Not sure what this does
app.use(expressEjsLayouts);

//routes
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/results', function(req, res) {
	mySearch = req.query.search;
	request( apiKey + mySearch, function(err, response, body) {  
    if(!err && response.statusCode === 200){
			var parsedJson = JSON.parse(body)
			res.render('results', {movie: parsedJson.Search})
		}
		else {
			console.log('error', err)
			res.send(err)
		}	
	});
})

//listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
