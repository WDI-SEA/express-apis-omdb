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
  res.render('index.ejs');
});

//GET /results -- take in data from the search form, render search results from OMDB
app.get('/results', (req, res) => {
  console.log(req.query)
  const userSearch = req.query.movieInput
  //  make an HTTP request to the API, supplying the user's input as a search query string
  // pass the data to the results template and render the data
  axios.get(`https://www.omdbapi.com/?s=${userSearch}&apikey=${process.env.API_KEY}`)
    .then(response => {
      console.log(response.data)
      // res.json(response.data)
      res.render('results.ejs', {
        movies: response.data.Search,
        // userSearch: userSearch
        // shorthand
        userSearch
      })
    })
    .catch(err => {
      console.log(err)
      res.send('server error')
    })
})

// GET /movies/:id -- render a page of details about a single movie with an id of :id
app.get('/movies/:id', (req, res) => {
  // make a request to the API and supply the :id as a imdbID
  axios.get(`https://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`)
  // render a page with the details for the movie
    .then(response => {
      res.json(response.data)
      res.render('detail.ejs', {
        deets: response.data
      })
    })
  // res.send(`show all the details with id ${req.params.id}`)
  .catch(err => {
    console.warn(err)
    res.send('the server is upset!')
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
