
//Requires and Global Vars
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

//Set & Use Statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function(req, res) {
  res.render('newSearch');
});

app.get('/results', function(req, res) {
  var userInput = req.query.name;
  var qs = {
      s: userInput
  };

  request({
  	url: 'http://www.omdbapi.com',
  	qs: qs
  }, function(error, response, body){
  	if(!error && response.statusCode == 200) {
  		var dataObj = JSON.parse(body);
  		res.render('results', {results: dataObj.Search});
      // res.send(dataObj.Search);
  	};
  });
});

app.get('/movies/:imdbID', function(req, res) {
  var qs = {
      i: req.params.imdbID
  };
  request ({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      res.render('movies', {result: dataObj});
      // res.send(dataObj.Search);
    }
  });
});

//Listen
module.exports = server;
var server = app.listen(process.env.PORT || 3000);




