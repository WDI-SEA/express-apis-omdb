var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
//var bodyParser = require
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('./index');
});



app.get('/results', function(req, res) {
  var searchTerm = req.query.searchTerm;
  var qs = {
    s: searchTerm
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body) {
        if (!error && response.statusCode == 200) {

          var dataObj = JSON.parse(body);

      res.render("./results", {results: dataObj.Search});
    }
  });
});


app.get('/movie/:imdbID', function(req, res){

   var qs = {
     i: req.params.imdbID,
     plot: 'long',
     r: 'json'
   }
   console.log(qs);
   request({
     url:'http://www.omdbapi.com/',
     qs: qs
   }, function(error, response, body){
        if (!error && response.statusCode == 200) {

      var data = JSON.parse(body);
      console.log(data);
     res.send(dataObj);
     res.render("movie", {movieData: data});
   }

   });

});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
