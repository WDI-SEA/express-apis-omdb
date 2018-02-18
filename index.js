var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();
var path = require('path');

app.use(express.static(path.join(_dirname, 'static'))); //css process

app.set('view engine', 'ejs');

app.get("/", function(req,res){
  res.render("index");
});


app.get('/results', function(req,res){ //hit the /results route -homework
  var qs = {
    s: req.query.title // req.query.title homework
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs
  }, function(error, response, body){
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render("results", {movies: dataObj.Search}); // change index to whatever your ejs file is called
    }
  })
});

app.get('/movies/:movie_id', function(req,res){ //hit the /results route -homework
  var movieID = req.params.movie_id;
  var qs = {
    i: movieID
  };
  request({
    url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_KEY + '&',
    qs: qs //qs in request takes an object
  }, function(error, response, body){
    if (!error && response.statusCode === 200) {
      var details = JSON.parse(body);
      console.log(details);
      res.render("details", {movie: details}); // change index to whatever your ejs file is called
    }
  })
});



app.listen(3000);
