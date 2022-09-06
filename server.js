require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');

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

// const API_KEY = process.env.API_KEY

// console.log('process.env:', process.env.API_KEY)
// // https://www.omdbapi.com/?i=tt3896198&apikey=4f54b295

// console.log(`https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}`)

// Routes
// GET / -- show search form for OMDB
app.get('/', function(req, res) {
  res.render('index.ejs')
});

// GET /results -- take in data from the search form, render search results from OMDB
app.get('/results', (req, res) => {
  console.log(req.query)
  const userSearch = req.query.movieInput
  // make a HTTP request to the api, suppling the user's input as a search query string
  axios.get(`https://www.omdbapi.com/?s=${userSearch}&apikey=${process.env.API_KEY}`)
    // pass the data to the results template and render the data
    .then(response => {
      console.log(response.data)
      // res.json(response.data)
      res.render('results.ejs', {
         movies: response.data.Search,
        //  userSearch: userSearch
        // shorthand
        userSearch
      })
    })
    .catch(err => {
      console.log(err)
      res.send('server error 😭')
    })
})

// GET /movies/:id -- render a page of details about a single movie with an id of :id
app.get('/movies/:id', (req, res) => {
  // make a request to the API and supply the :id as a imdbID
  axios.get(`https://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`)
    // render a page with details for the movie
    .then(response => {
      // res.json(response.data)
      res.render('detail.ejs', {
        deets: response.data
      })
    })
    .catch(err => {
      console.warn(err)
      res.send('the server is upsetti spaghetti 🍝')
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
