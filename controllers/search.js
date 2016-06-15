var express = require('express');
var request = require('request');
var app = express();

var router = express.Router();

router.get('/:search', function(req,res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.params.search
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj.Search)
      res.render('movies', {movies: dataObj.Search});
    }
  });
});

module.exports = router;
