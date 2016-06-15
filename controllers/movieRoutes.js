var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/results', function(req, res) {
  // how I get my query value
  // res.send(req.query.searchTerm);

  request({
    url: 'http://www.omdbapi.com/',
    qs: {
      s: req.query.searchTerm
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      res.render('results.ejs', { movies: movieData.Search });
    } else {
      res.send('Error');
    }
  });
});

router.get('/movies/:imdbId', function(req, res) {
  var imdbId = req.params.imdbId;
  request({
    url: 'http://www.omdbapi.com/',
    qs: {
      i: imdbId,
      tomatoes: true
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      res.render('movie.ejs', { movie: movieData });
    } else {
      res.send('error');
    }
  });
});

module.exports = router;
