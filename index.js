// Taking care of standard requirements
var express = require('express');
var request = require('request');
var app = express();

// Sets view engine
app.set('view engine', 'ejs');

// Requires express-ejs-layouts
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

// Requires morgan devkit (? purpose unknown ?)
app.use(require('morgan')('dev'));

// Renders main page index.ejs
app.get('/', function(req, res) {
  res.render('index');
});

// Search function takes query, searches omdb's database, renders results.ejs
app.get('/results', function(req, res) {
  request({
    url: 'http://www.omdbapi.com/?',
    qs: {
      s: req.query.search
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movies = JSON.parse(body);
      // res.send(dataObj.Search);
      res.render('results', { results: movies.Search
      });
    }
  });
});

var movieCtrl = require('./controllers/movie');
app.use('/movies', movieCtrl);

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
