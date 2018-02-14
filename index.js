// OMDB Search Site - APIs and Express
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();
app.set('view engine', 'ejs');

// this adds some logging to each request
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));




// ROUTES
app.get('/', function(req,res){
  console.log('whawtup');
  var qs = {
    s:'star wars'
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  },
   function(error,response,body) {
    // console.log(response.statusCode);
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      // console.log(dataObj);
      res.render('index', {movies: dataObj.Search});
    }
  });
});

app.get('/search', function(req,res){
  // console.log('in search path');
  res.render('search');
});

app.get('/results', function(req,res){
  // console.log('in results path');
  var qs = {
    s:req.query.title
  }
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body){
    if (!error && response.statusCode === 200){
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render('results', {movies: dataObj.Search});
    }
  })
});

// listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
