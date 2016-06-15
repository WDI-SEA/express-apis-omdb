var express = require('express');
var request = require('request');
var app = express();


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));

app.use(express.static('public'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('main');
})

app.get('/movie', function(req, res) {
  res.render('movieSearch');
});

app.get('/movies', function(req, res) {
  if (req.query.q === '') {
        res.send('No empty string');
      } else {
        request({
          url: 'http://www.omdbapi.com',
          qs: {
            s: req.query.q
          }
        }, function(error, response, body) {
          if(!error && response.statusCode === 200 && body.Response !== 'False' && body[2] !== '<') {
            var dataObj = JSON.parse(body);
            res.render('movies', { dataObj: dataObj.Search });
      }

  });
}
});

app.get('/moreInfo/:id', function(req, res) {
        request({
          url: 'http://www.omdbapi.com/' ,
          qs: {
            i: req.params.id
          }
        }, function(error, response, body) {
          if(!error && response.statusCode === 200 && body.Response !== 'False' && body[2] !== '<') {
            var dataObj = JSON.parse(body);
            res.render('moreInfo.ejs', { dataObj: dataObj });
      }
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
