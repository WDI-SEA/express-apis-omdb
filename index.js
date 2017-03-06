var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));


app.use(express.static('public'));

var detailsCtrl = require('./controllers/details');
app.use('/details', detailsCtrl);

app.get('/', function(req,res) {
  res.render('index.ejs');
});

app.get('/results', function(req, res) {
  res.render('results.ejs');
});

app.get('/details', function(req, res) {
  res.render('details.ejs');
});

app.get('/query', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.search
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('results.ejs', {results : dataObj.Search});
    }
  });
});

// app.get('/details/:id', function(req, res) {
//   request({
//     url: 'http://www.omdbapi.com',
//     qs: {
//       i: req.params.id,
//       plot: "long"
//     }
//   }, function(error, response, body) {
//     if(!error && response.statusCode === 200) {
//       var dataObj = JSON.parse(body);
//       console.log(dataObj);
//       res.render('details.ejs', {result: dataObj});
//     }
//   });
// });

var server = app.listen(process.env.PORT || 3100);

module.exports = server;
