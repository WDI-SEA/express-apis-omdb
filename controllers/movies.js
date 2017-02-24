//requires and global vars
var express = require("express");
var router = express.Router();
var request = require('request');
var fs = require("fs");

//routes
router.get("/favorites", function(req, res){
  var fileContents = fs.readFileSync("./data.json");
  var favMovies = JSON.parse(fileContents);
  res.render("favorites", {
    favMovies: favMovies,
  });
});

router.post("/:imdbId", function(req, res){
  //add to json
  var fileContents = fs.readFileSync("./data.json");
  var favMovies = JSON.parse(fileContents);

  var imdbId = req.params.imdbId;
  var qs = {
    i: imdbId,
    tomatoes: true
  };

  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      favMovies.push(dataObj);
      fs.writeFileSync("./data.json", JSON.stringify(favMovies));
      res.send({message: "successful add to fav"});
    }
  });
});

router.get("/:imdbId", function(req, res){
  var imdbId = req.params.imdbId;
  var qs = {
    i: imdbId,
    tomatoes: true
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
