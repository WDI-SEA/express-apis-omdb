require('dotenv').config();
const axios = require('axios');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const API_KEY = process.env.API_KEY

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

app.get('/results', (req, res) => {
  console.log(req.query.searchTerm)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
    console.log(response.data)
      res.render('results', {movie: response.data.Search})
  })
})

app.get('/results/:id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=n${req.params.id}`)
  .then(response => {
    res.send('show', {movie: response.data})
  })
})

// // The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// // We can export this server to other servers like this
module.exports = server;