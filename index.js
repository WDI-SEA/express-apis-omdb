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

//attached router and appends nothing
app.use('/movies', require('./controllers/movies.js'));

var server = app.listen(process.env.PORT || 3000);
module.exports = server;
