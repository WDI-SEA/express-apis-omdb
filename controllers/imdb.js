var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:imdbID', function(req, res) {
  // req.params.imdbLink
  console.log("TEST");
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      i: req.params.imdbID,
      tomatoes: true
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      res.render('synopsis', { details: JSON.parse(body) })
    }
  })


});

module.exports = router;
