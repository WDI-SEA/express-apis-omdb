require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

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
  res.render('index.ejs');
});

app.get('/results', function(req, res) {
  const url = `http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.API_KEY}`
  axios.get(url)
    .then(response => {
      res.render("results.ejs", { 
        movies : response.data.Search
       })
    })
});

app.get('/movies/:movie_id', function(req, res) {
  const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
  axios.get(url)
    .then(response => {
      res.render("detail.ejs", {
        details: response.data
      })
         })
    })


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
