require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();

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
  res.render('index.ejs')
});

app.get('/search', (req, res) => {
  const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.userInput}`
  axios.get(url)
    .then(response => {
      // console.log(response.data)
      res.render('results.ejs', {
        input: req.query.userInput,
        results: response.data
      })
    })
    .catch(console.warn)
})

app.get('/movies/:movie_id', (req, res) => {
  const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.movie_id}`
  axios.get(url)
    .then(response => {
      // console.log(response.data)
      res.render('detail.ejs', response.data)
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
