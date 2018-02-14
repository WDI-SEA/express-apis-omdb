var express = require('express');
var request = require('request');
// var bodyParser = require('body-parser');
var app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: false}))

// this adds some logging to each request
// app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
    res.render('index');
});


app.get('/results', function(req, res) { //hit the /results route
  console.log("im in the route");
  var qs = {
    s: req.query.title //req.query.title
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render('results', {movies: dataObj.Search}); //change index to whatever your ejs file is called
    }
  })
});

app.get('/movie/:movie_id', function(req, res) { //hit the /results route
  console.log("im in the route");
  var qs = {
    i: req.params.movie_id //req.query.title
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render('movie', {movie: dataObj}); //change index to whatever your ejs file is called
    }
  })
});


app.listen(3000);

// var server = app.listen(process.env.PORT || 3000);
//
// module.exports = server;
