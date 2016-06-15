var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.post('/', function(req, res) {
  //console.log(req.body.search);
  request({
    url: 'http://www.omdbapi.com/?',
    qs: {
      s: req.body.search
    }
  }, function(error, respond, body) {
      var data = JSON.parse(body);
      //if no error and the site is good
      if(!error && respond.statusCode === 200){
        //console.log(data);
        res.render('../views/movies.ejs', {data: data});
        //res.send(data);
      } else {
        res.send('error');
      }


  });
});

module.exports = router;

//router.get('/')


//app.listen(3000);
