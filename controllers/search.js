var express = require("express");
var router = express.Router();


router.get('/movies', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.search
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('movies', {results: dataObj.Search});
    }
  });
});

module.exports = router;

