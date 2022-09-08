// extention to hide api key
require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
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
// show search form
app.get('/', function(req, res) {
  res.render('index.ejs');
});
// take data from the search form, render search results from OMDB
app.get('/results', (req,res) => {
  // make http request to the swap
  console.log(req.query)
  const userSearch = req.query.movieInput
  const url = (`http://www.omdbapi.com/?s=${userSearch}&apikey=${process.env.API_KEY}`)
  axios.get(url)
    // pass the data to the results template and render the data
    .then(response => {
    console.log(response.data)
    res.render('results.ejs', {
      movies: response.data.Search,
      userSearch
    })
    })
    .catch(err => {
      console.log(err)
      res.send('server error')
    })
} )
// GET/movies:id -- render a page of details about a single movie with an id od :id
app.get('/movies/:id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`)
  .then(response => {
    res.render('detail.ejs', {
      deets: response.data
    })
  })
  .catch(err => {
    console.log(err)
    res.send('server error')
  })
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
