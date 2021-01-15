require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const db = require("./models");


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/results', function(req, res) {
  console.log(req.query.searchTerm)
  //res.send('Hello, backend!');
  axios.get(`http://www.omdbapi.com/?s=${req.query.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
      .then(response => {
        //console.log(response);
        res.render('results', {movies: response.data.Search});
      });
    
});

app.get('/movies/:movie_id', (req, res) => {
  let movieID = req.params.movie_id;
  axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${process.env.OMDB_API_KEY}`)
      .then(response => {
        res.render('show', {movie: response.data});
      });
});


app.get('/faves', (req, res) => {
  db.faves.findAll()
  .then(faves => {
    res.render('faves', {faves: faves})
  })
});

app.post('/faves', (req, res) => {
  console.log(req.body);
  db.faves.findOrCreate({
    where: {
      title: req.body.Title,
      imdbid: req.body.imdbID
    }
  }).then(([fave, created]) => {
    res.redirect('/faves')
  }).catch(err => console.log(err))
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3001);

// We can export this server to other servers like this
module.exports = server;
