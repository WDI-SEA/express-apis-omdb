require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { response } = require('express');
const apiKey = process.env.API_KEY

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

app.get('/search', (req, res) => {
  const url = `http://www.omdbapi.com/?s=${req.query.userInput}${apiKey}`;
  axios.get(url)
  .then(response => {
    res.render('results', {
      movieResults: response.data,
      movieInput: req.query.userInput
    });
    // console.log(response.data)
  })
  .catch(console.warn);
})

app.get('/movie/:movie_ID', (req, res) => {
  const url = `http://www.omdbapi.com/?i=${req.params.movie_ID}&${apiKey}`;
  axios.get(url)
  .then (response => {
    res.render('detail' , {
      movie: response.data
    })
    console.log(response.data)
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
