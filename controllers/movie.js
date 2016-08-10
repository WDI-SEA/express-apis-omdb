//Requirements
var express = require('express');
var request = require('request');
var router = express.Router();

//Routes
router.get('/:id', function(req, res){
 var qs = {
    i: req.params.id,
    plot: 'short',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function (error, response, body){
    var data = JSON.parse(body);
    if(!error && response.statusCode == 200){
      res.render('movie', {movies: data});
    } else {
      res.send("Nope! Didn't work. Looks like there was an error. :'(");
    }
  });
});

module.exports = router;