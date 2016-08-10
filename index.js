//variables
var express = require('express');
var request = require('request');
var app = express();
var movieControl = require("./controllers/movies")


//Set and Use Statements
app.set("view engine", "ejs");
app.use(require('morgan')('dev'));
app.use("/movies", movieControl);

//Routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/results', function(req, res) {
  ///search term
  var q = req.query.q;  

  var qs = {
    s: q,
    plot: 'short',
    r: 'json'
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  },function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.render("results", {results: dataObj.Search});
    }
  });
});

app.get('/movie/:id', function(req, res){
  var id = req.params.id;  

  var qs = {
    i: id,
    plot: 'short',
    r: 'json'
  };
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  },function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.send(dataObj);
    }
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;




















