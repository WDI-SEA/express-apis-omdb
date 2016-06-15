var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:id', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      i: req.params.id,
      plot: "long"
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      res.render('details.ejs', {result: dataObj});
    }
  });
});

module.exports = router;
