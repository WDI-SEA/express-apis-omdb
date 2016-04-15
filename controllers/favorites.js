var express = require("express");
var router = express.Router();
var db = require("./models");

router.get("/", function(req, res) {
	db.favorite_movie.findAll().then(function(favorite_movies) {
	console.log(favorite_movies);
	});
});

router.post("/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;

  request('http://www.omdbapi.com/?i=' + imdbIDRequested, function(err, response, body) {
    var data = JSON.parse(body);
    if(!err && response.statusCode === 200){
      db.favorite_movie.create({imdb_id:data.imdbID, title:data.title, year:data.year);
      res.redirect('/movies/' + imdbIDRequested);
    }
    else{
      res.render('error');
    }
  });
});

module.exports = router;