// REQUIREMENTS
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');

// GLOBAL VARIABLES
var app = express();

// SET/USE STATEMENTS
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));

// ROUTES
app.get('/', function(req, res) {
  res.render('movies/index');
});

app.get('/results', function(req, res){
  var qs = {
    s: req.query['q'],
    plot: 'short',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, respose, body){
    var data = JSON.parse(body);
    res.send(data.Search);
  });
});

// LISTEN
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
