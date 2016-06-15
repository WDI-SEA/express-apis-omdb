var express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
var ejsLayout = require('express-ejs-layouts')
app.use(ejsLayout);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', function(req, res) {

    request({
      url: 'http://omdbapi.com',
      qs: {
        s: req.query.q,
        type: 'movie'
      }
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log( JSON.parse(body).Search )
        res.render('results', { results: JSON.parse(body).Search })
      }
    })


  // res.render('results', { string: req });



})
app.use('/movie', require('./controllers/imdb'));
app.use('/search', require('./controllers/requester'));
app.use(express.static('public'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
