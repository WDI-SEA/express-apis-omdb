var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');
var router = express.Router();
var db = require("../models");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.get("/", function(req, res) {
	db.favorite.findAll().then(function(favorites) {
	//res.send(favorite_movies);
	res.render('favorites/index', {favorites: favorites});
	});
});

router.delete("/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;
  db.favorite.find({where:{imdbID:imdbIDRequested}}).then(function(movie){
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
      db.favorite.findOrCreate({where:{imdbID:data.imdbID, title:data.Title, year:data.Year, poster:data.Poster}})
      	.spread(function(favorite, created) {
      		res.redirect('/movies/' + imdbIDRequested);
    	});
    }
    else {
      res.render('error');
    }
  });
});

router.post("/:imdbID/comments", function(req, res) {
  var imdbIDRequested = req.params.imdbID;
  var newPost = req.body.post;

  //res.send("data: " + newPost);
  //console.log(newPost)

  db.favorite.find({where:{imdbID:imdbIDRequested}}).then(function(movie){
    db.comment.findOrCreate({where: {content: newPost, favoriteId: movie.id}}).spread(function(){
      res.redirect('/movies/' + imdbIDRequested);
    })
  })
});

module.exports = router;