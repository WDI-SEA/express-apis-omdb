// Require needed modules.
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');

// Declare a new express app.
var app = express();

// Tell express what view engine we want to use.
app.set('view engine', 'ejs');

// Define middleware
app.use(expressEjsLayouts);

// Define API path
var path = 'http://www.omdbapi.com/?i=tt3896198&apikey=2725be31&s=';
var queryString = '';

// Define routes.
// (Route, callbackFunction(request, response))
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/results', function(req, res) {
  queryString = req.query.search_thingie;
  console.log(queryString);
  request(path + queryString, function(err, response, body) {
    if(!err && response.statusCode === 200) {
      var parsedJson = JSON.parse(body);
      res.render('results', { movies: parsedJson.Search });

    } else {
      res.send(err);
    }
  });
});

// Listen on port 3000.
app.listen(3000);
