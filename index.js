require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();
let API_KEY = process.env.API_KEY

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
app.get('/results', (req, res) => {
  let search = req.query.searchBar;

  let qs = {
      params: {
          s: search,
          apiKey: API_KEY
      }
  }

  axios.get('http://www.omdbapi.com', qs)
  .then((response) => {
    let movies = response.data.Search;
    console.log(movies)
    
      // setting variable to our data
      res.render('results', {data: movies})
      // render home with the data
  })
  .catch(err => {
      console.log(err)
  })
})


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/movies/:id', (req, res) => {
  let imdbID = req.params.id;

  let qs = {
      params: {
          i: imdbID,
          apiKey: API_KEY
      }
  }

  axios.get('http://www.omdbapi.com', qs)
  .then((response) => {
    let movieDetails = response.data;
    console.log(movieDetails)
    
      // setting variable to our data
      res.render('detail', {data: movieDetails})
      // render home with the data
  })
  .catch(err => {
      console.log(err)
  })
})


// The app.listen function returns a server handle
let server = app.listen(process.env.PORT || 8000);

// We can export this server to other servers like this
module.exports = server;
