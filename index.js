var express = require("express");
var app = express();
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var db = require("./models");
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(ejsLayout);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get("/", function(req,res){
  res.render("index");
});


app.get('/movies', function(req, res){
  var query = req.query.q;
  //check for valid data
  if(query !== '' && query !== undefined) {
  request('http://www.omdbapi.com/?s=' + query , function(err, response, body){
   if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      // console.log(data); //search is the key
      res.render('movies', {results: data.Search});
    }
     
  });
} else {
  throw ("You must enter a valid search");
}
});





app.post('/favorites', function(req,res){
  console.log(req.body);
  // db.favorites.create({
    db.favorites.findOrCreate({where: {
    imdbid: req.body.imdbId,
    title: req.body.title,
    year: req.body.year,
}
  }).then(function(){
    res.send("success");
  })
});


app.get('/favorites', function(req,res){
  db.favorites.findAll().then(function(movies){ 
    // console.log(movies);
    res.render('favorites', {
      movies: movies
    })
  });
});







app.get('/movies/:id', function(req,res){
  
  request('http://www.omdbapi.com/?i=' + req.params.id + "&tomatoes=true", function(err, response, body){
    if (!err && response.statusCode == 200) {
     var data = JSON.parse(body);
      console.log(data);
      console.log(req.params.id);
      res.render('eachmovie', {myMovie: data});
    }
  });
});








app.listen(3000);