var express = require('express');
var request = require('request');
var app = express();
app.set('view engine', 'ejs')
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));

// app.get('/', function(req, res) {
//   res.send('Hello Backend!');
// });
app.get('/', function(req, res) {
  res.render('movies.ejs', {movies: []});
});

var movieCtrl = require('./controllers/search');
app.use('/search', movieCtrl);


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
