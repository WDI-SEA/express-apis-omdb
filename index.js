var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var db = require('./models'); //every model represents a table in our table base
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/movies', function(req, res) {
  var query = req.query.q;
  // if (query = undefined | "") 

  request('http://www.omdbapi.com/?s=' + query, function(error, response, body) {
   
    if (!error && response.statusCode === 200) {
       var data = JSON.parse(body);
       var results = data.Search;
       res.render('movies', {results: results});
    } else {
      res.render('index');
    }
  });
});

app.get('/movies/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(error, response, body) {
    res.render('movies/details', {movie: JSON.parse(body),
                                      q: searchQuery});
  });
});

app.post('/favorites/:imdb_id', function(req, res) {
  db.favMovies.create({
    imdb_id: req.body.imbd_id,
    title: req.body.title,
    year: req.body.year
  }).then(function(saved) {
    res.redirect('/favorites');
  });
});
 
app.get('/favorites', function(req, res) {
  db.favMovies.findAll().then(function(favs) {
     res.render('movies/favShow', {
      favorites: title
    }); 
  });
}); 

var port = 3000
app.listen(process.env.PORT || port);



// * **Modify the Show Movie page** (`GET /movies/:imdbId`)
//   * add "Add to Favorites" button
//     * Should add the IMDB code, title, and year to a database
//     * Should submit data to `POST /favorites`
// * **Favorites Page** (`GET /favorites`)
//   * show a list of movies that have been favorited
//   * each item should...
//     * Display title and year
//     * Link to "show movie" page
  

//sequelize model:create --name favMovies --attributes imdb_id:integer,title:string,year:integer
