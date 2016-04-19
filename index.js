var express = require("express");
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var request = require('request');
var db = require('./models');

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get("/", function(req, res) {
    var searchTerms = ['ghost', 'league', 'war', 'bear', 'fun', 'pizza', 'old', 'ace', 'happy']
    var randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    var randomMovieId = 0;

  request('http://www.omdbapi.com/?s=' + randomTerm + '&type=movie', function (error, response, body) {
    var results = JSON.parse(body);
    if (!error && response.statusCode == 200 && results.Search ) {
      randomMovieId = results.Search[Math.floor(Math.random() * results.Search.length)].imdbID

      request('http://www.omdbapi.com/?i=' + randomMovieId + '&type=movie&plot=full', function (error, response, body) {
        var movie = JSON.parse(body);
        if (!error && response.statusCode == 200&& movie ) {
          res.render('index', {randomMovie: movie});
        } else {
          res.render('index-safe')
        }
      });
    } else {
      res.render('index-safe');
    }
  });
});

app.get("/movies", function(req, res) {
	var query = req.query.q;
  var myFavorites = [];

  if (query) {
    request('http://www.omdbapi.com/?s=' + query + '&type=movie', function (error, response, body) {
      var data = JSON.parse(body);
      if (!error && response.statusCode == 200 && data.Search) {
        db.favorites
          .findAll({attributes: ['imdbCode', 'title', 'year']})
          .then(function(results) {
            results.forEach(function(favorite) {
              myFavorites.push(favorite.imdbCode);
            });
              res.render("movies", {movies: data.Search, q: query, favorites: myFavorites});
          });
      } else {
        res.render('movies-safe');
      }
    });
  } else {
    res.render('movies-safe');
  }
});

app.get('/movies/:index', function(req, res) {
  var movieId = req.params.index;
  if (movieId) {
    request('http://www.omdbapi.com/?i=' + movieId + '&type=movie&plot=full', function (error, response, body) {
        var data = JSON.parse(body);
        console.log(movieId);
        db.favorites.find({where: {imdbCode: movieId}}).then(function(result){
          console.log(result, 'pizza');
          res.render('show', {myMovie: data});
        });
      });
  } else {
    res.render('movies-safe');
  }
});

app.post('/favorites/remove/:id', function(req, res) {
  var movieId = req.params.id;
  if (movieId) {
    db.favorites.destroy({
      where: { imdbCode: movieId }
      }).then(function(){
          res.sendStatus('success');
      })
  }
});


//***************************************//

app.get('/favorites/:id/comments', function(req, res) {
  var movieId = req.params.id;
  console.log(movieId);
  if (movieId) {
    db.favorites
      .findAll({where: {favoritesId: movieId}})
      .then(function(results) {
        res.render('comments', comments: results)
      });
  };
});


app.post('/comments/:id', function(req, res) {
  var movieId = req.params.id;
  db.favorites.find({where: {favoritesId: movieId}}).then(function(favorites) {
    favorites.createPost({
      comment: 'Post title',
      favoritesId: movieId
  }).then(function(post) {
    console.log(post.get());
  });
  })
})



//**************************************//

app.post('/favorites/:id', function(req, res) {
  var movieId = req.params.id;
  if (movieId) {
    request('http://www.omdbapi.com/?i=' + movieId + '&type=movie&plot=full', function (error, response, body) {
      var data = JSON.parse(body);
      db.favorites
        .findOrCreate({where: { imdbCode: movieId, title: data.Title, year: data.Year }})
        .spread(function(fave, created) {
          if (created) {
            res.sendStatus('created');
          }
        })
      });
    };
});

app.get("/favorites", function(req, res) {

  db.favorites
    .findAll({attributes: ['imdbCode', 'title', 'year']})
    .then(function(results) {
        res.render('favorites', {favorites: results});
    });
});


// app.post('/favorites',( function(req, res) {
  
//   // db.favorites.create(req.body).then(function() {
//   //   res.sendStatus(200);
//   // });

// });

app.listen(3000);