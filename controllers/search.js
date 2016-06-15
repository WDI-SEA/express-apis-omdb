var express = require('express');
var request = require('request');         // you don't need this in the main index file since you have it here
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get('/movies', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      // s: req.body.search
      s: req.query.q
    }
  }, function(error, response, body) {

    if(!error && response.statusCode === 200 && body.Response !== 'False' && body[2] !== '<') {
      var data = JSON.parse(body);
      // console.log(data);
      res.render('movies.ejs', {data: data.Search});
      // res.send(data);
    }else {
      res.send('error');
    }
  });
});

module.exports = router;
