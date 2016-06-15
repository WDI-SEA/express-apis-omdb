var express = require('express');
var request = require("request");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");

app.set("view engine", "ejs")

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended:false }));
app.use(require('morgan')('dev'));
///////////////////////////////////////////////

app.get('/', function(req, res) {
  res.render("index.ejs");
  // res.write(req.body);
  // res.write(reqBody);
});


app.get("/userSearch", function (req, res) {
  request({
    url: "http://www.omdbapi.com",
    qs: {
      s: req.query.title
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render("results.ejs", {results: dataObj.Search});
    }
  });
});

app.get("/results", function (req, res) {
  res.render("results.ejs");
});

app.get("/details/:id", function (req, res) {
  request({
    url: "http://www.omdbapi.com",
    qs: {
      i: req.params.id
      // plot: "long"
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var detailsObj = JSON.parse(body);
      console.log(detailsObj);
      res.render("details.ejs", {details: detailsObj});
    }
  });
});

///////////////////////////////////////////////
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
