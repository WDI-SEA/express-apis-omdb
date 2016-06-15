var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');


app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
// set up ejs-layouts
// requires the 'layout.ejs' file in the root of /views folder
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var searchControl = require('./controllers/search');
app.use('/search', searchControl); // when you go to /search it will go to searchController
// can also be written as
// app.use('/search', require('./controllers/search'));


app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render('index');
});

app.get('/movie/:id', function(req, res) {
  // res.send(req.params.id)
  request({
    url: 'http://www.omdbapi.com/',
    qs:{
      i: req.params.id                // id is what's in line 21 ":id"
    }
  }, function(error, response, body) {
      //res.send(body)
      var parsed = JSON.parse(body)
      res.render('details.ejs', {movie: parsed})
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
