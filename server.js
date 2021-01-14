require('dotenv').config();
const { default: axios } = require('axios');
const { response } = require('express');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const db = require('./models');

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static(path.join(__dirname, '/static')));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

// results
app.get('/results', (req, res) => {
  axios.get(`http://www.omdbapi.com/?s=${req.query.Title}&apikey=${process.env.OMDB_API_KEY}&`)
  .then(response => {
    res.render('results', {movies: response.data.Search});
    // console.log(response.data)
  })
});

app.get('/movies/:id', (req, res) => {
  let movieID = req.params.id;
  console.log(movieID);
  axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${process.env.OMDB_API_KEY}&`)
  .then(response => {
    res.render('detail', {movie: response.data})
  }).catch(err => console.log("error getting results"))
});

app.get('/faves', (req, res) => {
  db.fav.findAll()
  .then(favMovieDB => {
    res.render('/fav', {favMovieDB});
    console.log(favMovieDB)
  });
});

app.post('/fav', (req, res) => {
  console.log('------posting fav');
  db.fav.create({
    title: req.body.title,
    omdbID: req.body.omdbID,
    imgURL: req.body.imgURL
  }).then(favoredMovie => {
    console.log(favoredMovie)
    res.redirect(`/movies/${req.body.omdbID}`)
    // process.exit();
  }).catch(err => {
    console.log(err);
  })
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, () => console.log("server is working"));



// We can export this server to other servers like this
module.exports = server;