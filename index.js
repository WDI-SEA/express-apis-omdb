var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

app.use(require('morgan')('combined'));

app.get('/', function(req, res) {
  res.render('search');
});

app.post('/search', function(req, res){
  console.log(req.body);
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.body.name
    },
    headers: {
      'Accept': 'application/json'
    }
  }, function(error, response, body){
    console.log(body);
    if(!error && response.statusCode === 200){
      var dataObj = JSON.parse(body);

      // res.send(dataObj.Search);
      res.render('results', {results: dataObj.Search});
    }
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
