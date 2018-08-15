var express = require('express');
var app = express();
var request = require('request');


app.use(require('morgan')('dev'));
app.get('/', function(req, res) {
  res.render('layout')
})


app.set('view engine', 'ejs');


app.get('/info', function(req, res) {
  var search = req.query.movie
  request('http://www.omdbapi.com?apikey=6e4ef661&s=' + search, function(err, response, body) {
    if(!err && response.statusCode ===200) {
      var parsedJson = JSON.parse(body);
      res.render('info', {movies: parsedJson.Search});
    }
    else {
      res.send(err);
    }
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
