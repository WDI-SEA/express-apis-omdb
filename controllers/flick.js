var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:id', function(req, res) {
  console.log(req.query);
  request({
    url: 'http://omdbapi.com/?',
    qs: {
      i: req.params.id
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('flick.ejs', {movies: dataObj.Id})
    }
  });
});

module.exports = router;
