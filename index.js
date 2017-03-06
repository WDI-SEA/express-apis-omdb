var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var prevSearch;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

app.use(express.static(__dirname + '/public'));

app.use(require('morgan')('combined'));

app.get('/', function(req, res) {
  res.render('search');
});

app.post('/search', function(req, res){
  prevSearch = req.body.name;
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.body.name
    },
    headers: {
      'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(!error && response.statusCode === 200){
      var dataObj = JSON.parse(body);

      res.render('results', {results: dataObj.Search, queryString: req.body.name});
    }
  });
});

app.get('/info/:imdbID', function(req, res){
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      i: req.params.imdbID
    },
    headers: {
      'Accept': 'application/json'
    }
  }, function(error, response, body){
    if(!error && response.statusCode === 200){
      var dataObj = JSON.parse(body);
      res.render('info', {info: dataObj, prevSearch: prevSearch});
    }
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
