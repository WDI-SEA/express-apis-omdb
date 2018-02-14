var express = require("express");
var request = require("request");
require("dotenv").config();

var app = express();
app.set("view engine", "ejs");

app.get("/results", function(req, res){
  console.log("running results");
  var qs = {
    s:req.query.search
  };
  console.log(qs);
  request({
    url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&",
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render("show", {movies: dataObj.Search});
    };
  });
});

app.get("/movies/:movie_id", function(req, res){
  var movieID = req.params.movie_id;
  var qs = {
    i: movieID
  };
  request({
    url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&",
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var details = JSON.parse(body);
      console.log(details);
      res.render("specific", {movieDetail: details});
    };
  })
});

app.get('*', function(req, res) {
    res.render("index");
});
app.listen(5000);
