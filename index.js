var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('main.ejs');
});

app.get('/results', function(req, res) {
  res.send('This is /results');
});

app.get('/movies/:imdbId', function(req, res) {
  res.send('This is /movies/:imdbId');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
