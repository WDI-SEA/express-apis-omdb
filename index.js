var express = require('express');
var request = require('request'); 
var bodyParser = require('body-parser');

require('dotenv').config(); //this node module is just written this way, env way --then process.env.OMDB_KEY

var app = express();
// app.use(express.static(path.join(__dirname, 'static'))); //either way works
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
})

app.post("/results", function(req, res) {
	var qs = {
		s: req.body.title //we put s as the property b/c OMDB requires it for title search
	}
	request({
		url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&", //OMDB docs
		qs: qs
	}, function (error, response, body) {
		console.log(error, response);
		if (!error && response.statusCode === 200) {
			var dataObj = JSON.parse(body);
			console.log('dataObj');
			res.render('results', {movies: dataObj.Search}) //.Search b/c dataObj structure data in search property
		}
	}
  )
})

app.get('/movie/:id', function(req,res) { // to your results
   var qs = {
     i: req.params.id //req.query.title 'i' comes from OMDB Doc
   };
   request({
     url:'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&', //hard coded API key - not safe
     qs: qs //qs in request takes an object
   }, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var dataObj = JSON.parse(body);
       console.log('dataObj')
       res.render('idresult', {movie: dataObj}); // change index to whatever your ejs file is called
     }
   })
 });




app.listen(3000);