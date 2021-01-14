require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const API_KEY = process.env.API_KEY
// const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`
const axios = require('axios')
const db = require('./models')


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
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', (req, res) => {
  console.log(req.query.searchTerm)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
    .then(response => {
      console.log(response.data.Search)
      res.render('results', {movieResults: response.data.Search || []})
    })
})

app.get('/movies/:movie_id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
  .then(response => {
    res.render('detail', {movieDetail: response.data})
  })
})

app.get('/faves', (req, res) => {
  db.fave.findAll()
  .then(favesFromDb => {
    res.render('faves', {faveMovies: favesFromDb})
  })
})
    

app.post('/faves', (req, res) => {
  console.log(req.body.title)
  console.log(req.body.imdbid)
  db.fave.create({
    title: req.body.title,
    imdbid: req.body.imdbid
  })
  .then(faveMovie=>{
    console.log(faveMovie)
    res.redirect('faves')
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
