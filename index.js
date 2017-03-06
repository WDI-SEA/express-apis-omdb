var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/results', function(req,res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.q
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj.Search)
      res.render('results', {movies: dataObj.Search});
    }
  });
});
var imdbid = require('./controllers/imdb')
app.use('/movie', imdbid)

var movieCtrl = require('./controllers/search')
app.use('/search', movieCtrl);

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
