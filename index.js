//Requires
var express = require('express');
var bodyParser = require("body-parser"); //enables us to read post variables
var fs = require("fs"); //enables us to read from and write to files
var ejsLayouts = require("express-ejs-layouts"); //enables us to use a layout
var request = require("request"); //enables XMLHttp Requests (ie.. like Ajax)


//Declare the app variable
var app = express();

//Use or Set Statements
app.use(bodyParser.urlencoded({extended : false})); //enables us to read post variables from the req
app.set("view engine", "ejs");
app.use(require('morgan')('dev'));
app.use(ejsLayouts);

//Define Routes and Paths
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/', function(req, res) {
 app.get("/searchResults", function(req, res) {
   console.log(req.query);
   var searchInput = {
     s: req.query.searchInput
   };
 
   request({
     url: "http://www.omdbapi.com",
     qs: searchInput
   },
   function(error, response, body) {
     if (!error && response.statusCode == 200) {
       var movieData = JSON.parse(body);
       res.render("searchResults", { movies: movieData.Search });
     } else {
       res.send("An error happened: " + error);
     }
   })
  });
});


var server = app.listen(process.env.PORT || 3000);

module.exports = server;