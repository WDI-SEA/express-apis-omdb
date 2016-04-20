var express = require("express");
var request = require('request');

var router = express.Router();


// Route for "/movie/:imdbID"
router.get("/:imdbID", function(req, res) {
  request({
    url: 'http://omdbapi.com',
    qs: {
      i: req.params.imdbID,
      plot: 'full',
      r: 'json'
    }
  }, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render('show-movie', {movie: data});
      }
    });
});


router.post("/:imdbID", function(req, res) {
  console.log("POST request received by server.")
  res.redirect('/');
  // request({
  //   url: 'http://omdbapi.com',
  //   qs: {
  //     i: req.params.imdbID,
  //     plot: 'full',
  //     r: 'json'
  //   }
  // }, function(err, response, body) {
  //     if (!err && response.statusCode == 200) {
  //       var data = JSON.parse(body);
  //       db.favorite.create({title: data.Title}).then(function(data) {
  //         console.log(data.Title, "added!");
  //       });
  //       // res.render('show-movie', {movie: data});
  //       res.redirect('/');
  //     }
  //   });
});


module.exports = router;