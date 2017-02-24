var express = require('express');
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var request = require('request');

app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);


app.get('/', function(req, res) {
  res.render('search')
});

app.get('/results', function(req, res){
  var qs = {
  s: req.query.movie,
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      //res.send(dataObj.Search);
      res.render('results', {results: dataObj.Search})
    }
  })
});

app.get('/movies/:id', function(req, res){
  var qs = {
  i: req.params.id,
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      console.log(dataObj)
      res.render('ids', {results: dataObj})
    }
  })
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
