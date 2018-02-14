var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res) { // to your results
  res.render('index');
});

app.get('/results', function(req, res) { // to your form
    var qs = {
      s: req.query.title //req.query.title
    };
    request({
      url:'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&', //hard coded API key - not safe
      qs: qs
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var dataObj = JSON.parse(body);
         //data back from the api, we're parsing the body which is returned
        res.render('results', {movies: dataObj.Search}); // change index to whatever your ejs file is called
      }
    })
});

app.get('/movie/:id', function(req,res) { // to your results
  var qs = {
    i: req.params.id //req.query.title
  };
  request({
    url:'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&', //hard coded API key - not safe
    qs: qs
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj.Title); //data back from the api, we're parsing the body which is returned
      res.render('movie', {movie: dataObj}); // change index to whatever your ejs file is called
    }
  })
});

app.listen(3000);
