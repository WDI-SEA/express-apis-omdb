var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
var id = req.params.id;  

  var qs = {
    i: id,
    plot: 'short',
    r: 'json'
  };
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  },function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.send(dataObj);
    }
  });
});

module.exports = router;