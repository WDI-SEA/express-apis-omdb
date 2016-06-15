var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/:i', function(req, res) {
  request({
    url: 'http://www.omdbapi.com/?',
    qs: {
      i: req.params.i
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      // res.send for now (to test) - later, res.render
      // res.send(movie);
      res.render('movie.ejs', { movie: movie
      });
    }
  });
});

module.exports = router;
