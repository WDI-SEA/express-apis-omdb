var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require("request");
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));



app.get("/", function(req, res) {
  res.render('index.ejs');
});

// app.get('/movies', function(req, res) {
//   var query = req.query.q;
//   request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
//     var data = JSON.parse(body);
//     if (!err && response.statusCode === 200 && data.Search) {
//       res.render('movies', {movies: data.Search,
//                             q: query});
//     } else {
//       res.render('error');
//     }
//   });
// });


app.get("/movies", function(req, res) {
  var query = req.query.q;
  request('http://www.omdbapi.com/?s='+query, function(error, response, body) {
    var data = JSON.parse(body);
    if(!error && response.statusCode == 200 && data.Search) {
      res.render('movie', {movies: data.Search,
                            q: query});
    } else {
      res.render('error');
    }
  });
});

// app.get('/movies/:imdbID', function(req, res) {
//   var searchQuery = req.query.q ? req.query.q : '';
//   var imdbID = req.params.imdbID;
//   request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
//     res.render('movieShow', {movie: JSON.parse(body),
//                              q: searchQuery});
//   });
// });

app.get("/movies/:imdbID", function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?plot=full&tomatoes=true&i='+imdbID, function(error, response, body) {
    res.render("movieShow", {
      movie: JSON.parse(body),
      q: searchQuery
    });
  });
});


app.listen(3000);