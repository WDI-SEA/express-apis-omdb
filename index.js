'use strict'; //enable let

// DEPENDENCIES

var express = require('express');
var app = express();
var ejs = require('ejs');
var request = require('request');


var DEFAULT_PORT = 3000;
var PORT = process.env.PORT || DEFAULT_PORT;
var SERVER_MSG = 'Api Test is now running on port ' + PORT;
var mediaTypeStrings = {
  '': 'Media',
  'movie': 'Movies',
};



app.set('view engine', 'ejs');



// SERVER

app.listen(PORT, function() {
  console.log(SERVER_MSG);
});

// ROUTES

app.get('/', function(req, res) {
  res.render('search');
});

app.get('/results', function(req, res) {
  var searchTerm = req.query.searchTerm;
  var mediaType = req.query.mediaType;
  var searchUrl = `http://www.omdbapi.com/?s=${searchTerm}&type=${mediaType}`;


  request(searchUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var searchResults = JSON.parse(body);


      res.render('results', {
        searchTerm: searchTerm,
        mediaType: mediaTypeStrings[mediaType],
        searchResults: searchResults.Search
      });
    } else {
      console.log('Status Code: ', response.statusCode);
      console.log('Error: ', error);
    }
  });
});

// MAIN