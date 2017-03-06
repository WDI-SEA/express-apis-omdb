// Server Configuration Stuff
var express = require('express');
var request = require("request");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");

app.set("view engine", "ejs")

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended:false }));
app.use(require('morgan')('dev'));
app.use(express.static("public"));
///////////////////////////////////////////////

app.get('/', function(req, res) {
  res.render("index.ejs");
  // res.write(req.body);
  // res.write(reqBody);
});

var resultsCtrl = require("./controllers/results");
app.use("/results", resultsCtrl);

var detailsCtrl = require("./controllers/details");
app.use("/details", detailsCtrl);

///////////////////////////////////////////////
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
