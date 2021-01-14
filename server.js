require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const methodOverride = require('method-override');
let db = require('./models')

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// to PUT and DELETE routes
app.use(methodOverride('_method'));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', (req, res) => {
  console.log(req.query)
  axios.get(`http://www.omdbapi.com/?s=${req.query.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
      .then(response => {
        console.log(response.data)
        res.render('results', {movies: response.data.Search})
      })
      .catch((error)=>{
        console.log('error', error);
      })
});


app.get('/movies/:movie_id', function(req, res) {
  let movieID = req.params.movie_id;
  console.log(movieID)
  axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
      console.log(response.data);
      res.render('show', {movie: response.data});
    })
})

app.get('/faves', (req, res) => {
  db.faves.findAll()
  .then(movies => {
    res.render('faves', {movies})
  })
})

app.post('/faves', (req, res) => {
  db.faves.create({
    title: req.body.title,
    imdbid: req.body.imdbID
  })
  .then(newMovie => {
    console.log('New Movie here')
    res.redirect('/faves')
  }).catch(err => {
    console.log('-----ERROR-----', err)
  })
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
