// Var and GVs
var express = require('express');
var request = require('request');
// var fs = require('fs');
// var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require("body-parser")
var app = express();

// use and set
// app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs');


// go to result page?
app.get('/results', function(req, res) {
  var searchWord = req.query.name
   var qs= {
     s: searchWord
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);

      res.render("results", {results: dataObj.Search});
    }
  });
});

// search page


app.listen(3000);
