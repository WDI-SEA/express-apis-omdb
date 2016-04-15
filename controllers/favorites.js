var express = require("express");
var request = require("request");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
	db.favorite_movie.findAll().then(function(favorite_movies) {
	//res.send(favorite_movies);
	res.render('favorites/index', {favorites: favorite_movies});
	});
});

router.delete("/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;
  db.favorite_movie.find({where:{imdb_id:imdbIDRequested}}).then(function(movie){
  	movie.destroy().then(function(){
  		console.log("Destroyed");
  		res.sendStatus(200);
  	})
  });
});

router.post("/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;

  request('http://www.omdbapi.com/?i=' + imdbIDRequested, function(err, response, body) {
    var data = JSON.parse(body);
    if(!err && response.statusCode === 200){
      db.favorite_movie.findOrCreate({where:{imdb_id:data.imdbID, title:data.Title, year:data.Year, poster:data.Poster}})
      	.spread(function(favorite_movie, created) {
      		res.redirect('/movies/' + imdbIDRequested);
    	});
    }
    else {
      res.render('error');
    }
  });
});

// db.user
//   .findOrCreate({where: { firstName: 'Brian' }})
//   .spread(function(user, created) {
//     console.log(user); // returns info about the user
//   });



module.exports = router;