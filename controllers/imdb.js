var express = require('express');
var request = require('request');
var app = express();

var router = express.Router();

router.get('/:imdbId', function(req,res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      i: req.params.imdbId,
      tomatoes: true
    }
  }, function(error,response,body) {
    if(!error && response.statusCode === 200) {
      console.log(body);
      res.render('synopsis.ejs', { details: JSON.parse(body)})
    }
  })
});

module.exports = router;
