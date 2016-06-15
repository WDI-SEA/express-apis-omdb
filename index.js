var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(require('morgan')('dev'));

app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('search');
});

app.get('/movies', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.search
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      // res.send(dataObj);
      res.render('movies', {results: dataObj.Search});
    }
  });
});

app.get('/moreinfo/:id', function(req, res) {
  request({
    url: 'http://www.omdbapi.com/',
    qs: {
      i: req.params.id
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var otherData = JSON.parse(body);
      res.render('moreinfo', {results: otherData});
    }
  });
});

var server = app.listen(process.env.PORT || 3000);
module.exports = server;
