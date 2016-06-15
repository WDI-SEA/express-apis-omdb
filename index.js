var express = require('express');
var app = express();

app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.send('Hello Backend!');
});

app.get('/results', function(req, res) {
  res.send('This is /results');
});

app.get('/movies/:imdbId', function(req, res) {
  res.send('This is /movies/:imdbId');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
