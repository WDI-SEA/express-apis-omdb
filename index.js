//Requirements
var express = require('express');
var request = require('request');
var moviesCtrl = require("./controllers/movie");

//Global Variables
var app = express();

//Set/Use Statements
app.set("view engine", "ejs");
app.use(require('morgan')('dev'));
app.use("/movie", moviesCtrl);

//Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', function(req, res){
  var qs = {
    s: req.query.q,
    plot: 'short',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    var data = JSON.parse(body);
    if(!error && response.statusCode == 200){
      res.render('results', {results: data.Search});
    } else {
      res.send("Nope! Didn't work. Looks like there was an error. :'(");
    }
  });
});

//Listen
var server = app.listen(process.env.PORT || 3000);

//Exports
module.exports = server;
