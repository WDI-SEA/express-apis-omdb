// get server
var express = require('express');
// declare new app (new express server?)
var app = express();
var request = require('request');

// this adds some logging to each request
app.use(require('morgan')('dev'));

// add embedded javascript functionality
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/results', function(req, res) {
  // get user input
  var query = req.query.name
  console.log('query is', query);
  // start imdb request
  request('http://www.omdbapi.com/?apikey=7ba94062&s=' + query,
    function(err, response, body) {
      if(!err && response.statusCode === 200) {
        var parsedJson = JSON.parse(body);
        if (parsedJson.Search) {
          res.render('results', { movies: parsedJson.Search });
        }
        else {
          res.send('no movies found!');
        }
      }
      else {
        res.send(err);
      }

    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
