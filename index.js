var express = require('express');
var request = require('request'); 
var bodyParser = require('body-parser');

require('dotenv').config(); //this node module is just written this way, env way --then process.env.OMDB_KEY


var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
})

app.post("/results", function(req, res) {
	var qs = {
		s: req.body.title //we put s as the property b/c OMDB requires it
	}
	request({
		url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&",
		qs: qs
	}, function (error, response, body) {
		console.log(error, response);
		if (!error && response.statusCode === 200) {
			var dataObj = JSON.parse(body);
			console.log('dataObj');
			res.render('results', {movies: dataObj.Search})
		}
	}
  )
})




app.listen(3000);