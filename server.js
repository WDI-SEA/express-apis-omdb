require('dotenv').config();
const axios = require('axios');
const { response } = require('express');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const API_KEY = process.env.API_KEY
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
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) => {
  console.log(req.query.searchTerm)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
    console.log(response.data)
    res.render('results', {movies: response.data.Search})
  })
})

app.get('/movies/:id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.id}`)
  .then(response => {
    console.log(response.data)
  res.render('detail', {movie: response.data})
  })
  .catch((error) => {
  })
})

// 
app.get('/faves', (req, res) = > {
  
})

//post to faves

app.post('/faves', (req, res) => {
  db.fave.create(req.body).then(createdFav => {
    console.log(createdFav)
    res.redirect('/faves')
  })
})

// // The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// // We can export this server to other servers like this
module.exports = server;