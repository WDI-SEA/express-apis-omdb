var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');
var db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static(__dirname +'/views'));
app.use(express.static(__dirname +'/css'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get("/", function(req, res) {
  res.render("index")
});

app.get('/movies', function(req, res) {
  var query =  req.query.q;
  console.log(query);

  request('http://www.omdbapi.com/?s='+query, function(err, response, body){
    var data =  JSON.parse(body);
    if(!err && response.statusCode === 200 && data.Search) {
      res.render('movies',{movies:data.Search, q:query});
    } else {
      res.render('error');
    }
  });
});


app.get('/movies/:imdbID', function(req, res){
  var imdbID = req.params.imdbID;
  var url = 'http://www.omdbapi.com/?i='+imdbID;

  request(url, function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    if(!err && response.statusCode === 200) {
      res.render('plot', {movie: data});
    }
  });
});

app.post('/favorites', function(req, res) {
var movieId = req.body.id;
var movieTitle = req.body.title;
var movieYear = req.body.year;
db.favorite.create({omdbid:movieId, title:movieTitle,year:movieYear}).then (function(movie,err){
  res.redirect('/favorites');
})

})

app.get('/favorites', function(req, res) {
  db.favorite.findAll().then(function(movies){
    res.render('favorites',{movies:movies});
  })
})
// app.get('movies')



app.listen(process.env.PORT || 3000);
