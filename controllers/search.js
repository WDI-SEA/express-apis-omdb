var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  console.log(req.query);
  request({
    url: 'http://omdbapi.com/?',
    qs: {
      s: req.query.search
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('movies.ejs', {movies: dataObj.Search})
    }
  });
});

module.exports = router;
