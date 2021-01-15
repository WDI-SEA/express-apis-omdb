//
require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./models')
const axios = require('axios');


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static(`${__dirname}/static`));
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
app.get('/results', function(req, res) {
  console.log(req.query)
  axios.get(`http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.APIKEY}`)
  .then(function (response){
    console.log(response.data.Search);
    res.render('results', {movies: response.data.Search});
  })
})

app.get('/movies/:movie_id', function(req, res) {
  let movieId = req.params.movie_id
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.APIKEY}&i=${movieId}`)
  .then(function (response){
    let movieResult = response.data
    console.log(movieResult)
    res.render('detail', {title: response.data.Title, genre: response.data.Genre, imdbid: response.data.imdbID})
  })
})
app.get('/faves', (req,res) => {
  db.fave.findAll()
  .then(faves => {
    res.render('fave', {faves})

  }).catch(error => {
    console.log(error);
  })
})
app.post('/faves', (req, res) => {
  db.fave.create({
    title: req.body.title, 
    imdbid: req.body.imdbid
  })
  .then(newFave => {
    console.log("favorite movie created")
    res.redirect("/faves")
  } )
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 8000, console.log('Your listening to the futuristic sounds of PORT 8000 🔮'));

// We can export this server to other servers like this
module.exports = server;
