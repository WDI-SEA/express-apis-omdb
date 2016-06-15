var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('main.ejs');
});

app.use('/', require('./controllers/movieRoutes'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
