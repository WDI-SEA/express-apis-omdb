var express = require("express");
var bodyParser = require("body-parser");
var db = require('./models');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));




app.get("/", function(req, res) {
  res.render("index");
});

app.post("/favorites", function(req,res){
  db.favorite.create({
    imdbId:req.body.imdbId,
    title:req.body.titleFav,
    year:req.body.yearFav
  }).then(function(favorite){
    res.send("success!")
  })
  // console.log(req.body);
});
//find or create!!!

// app.get('/comments', function(req,res){
//   res.render()
// })


app.get('/favorites/:id/comments',function(req,res){
  db.favorite.findOne({where: {id:req.params.id},include:[db.comment]}).then(function(favorite){
    res.render('comments', {favorite: favorite})
  })
});

app.post('/favorites/:id/comments',function(req,res){
  var newComment = req.body;
  newComment.favoriteId = req.params.id
  db.comment.create(newComment).then(function(comment){
    res.redirect('/favorites/'+ req.params.id + '/comments');
  });
});

app.post('/tags',function(req,res){
  var newTag = req.body.name;
  db.favorite.findOrCreate({where: {name: newTag}}).spread(function(favorite, created) {
    favorite.createTag({name: newTag}).then(function(tag) {
    console.log(newTag);
    console.log("tag added");
    });
  });
});


app.get('/tags', function(req, res) {
  var eachTag = req.params.name;
  console.log(eachTag);
  db.tag.find({where: {name: eachTag}}).then(function(tag) {
    tag.getFavorites().then(function(favorites) {
    console.log("These favorites are tagged with " + eachTag + ":");
      favorites.forEach(function(favorite) {
      console.log("Favorite title: " + favorite.title);
      });
    });
  });
});
  





app.get("/favorites", function(req,res){
  db.favorite.findAll().then(function(movies) {
    res.render("favorites", {movies: movies});
  // console.log(movies);  
  });
});


app.get("/movies", function(req, res) {
  var query = req.query.q;
  if (!query){
    // console.log('nope');
    return false;
  }
  request('http://www.omdbapi.com?s=' + query, function(err, response, body) {
      var data = JSON.parse(body);
    if (!err && response.statusCode == 200 && data.Search) {
      var results = data.Search;
      res.render("movies", {results: results, q: query});
    } else {
      res.render('error')
    } 
  });
});



app.get('/movies/:imdb', function(req, res){
  request('http://www.omdbapi.com?i=' + req.params.imdb + "&tomatoes=true", function(err, response, body) {
      var data = JSON.parse(body);
      // console.log(data);
    if (!err && response.statusCode == 200) {    
      res.render("movies/show", {result: data});
    } else {
      res.render('error')
    } 
  });
});

app.delete('/favorites', function(req, res) {
  var id = req.body.id;
  console.log(id);
  db.favorite.find({where: {id: id}}).then(function(id){
    id.destroy().then(function(u){
      res.send('success');
    });
  });
});


app.listen(process.env.PORT || 3000);