var express = require("express");
var request = require("request");
var router = express.Router();


router.get('/', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.searchTerm
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log(dataObj);
      // res.send(dataObj);
      res.render('movies', {results: dataObj.Search});
    }
  });
});

router.get('/moreinfo/:id', function(req, res) {
  request({
    url: 'http://www.omdbapi.com/',
    qs: {
      i: req.params.id
    }
  }, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var otherData = JSON.parse(body);
      res.render('moreinfo', {results: otherData});
    }
  });
});

module.exports = router;

