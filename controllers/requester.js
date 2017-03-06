var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/:type/:name', function(req, res) {

  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.params.name,
      type: req.params.type
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('query', { results: JSON.parse(body).Search });
    }
  })

})

module.exports = router;
