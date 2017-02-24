//requires and global vars
var express = require("express");
var router = express.Router();
var request = require('request');

//routes
router.get("/:imdbId", function(req, res){
  var imdbId = req.params.imdbId;
  var qs = {
    i: imdbId
  };

  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.render("movie", {results: dataObj});
    }
  });
});


//export
module.exports = router;
