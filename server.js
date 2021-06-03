require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();
const PORT = 5000
const omdbAPIKey = process.env.OMDB_API_KEY


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);


// define API key variable


// Routes
app.get('/', (req, res) => {
  res.render('home')
})

// route for results
app.get('/results', (req, res) => {
  let newObject = {
    params: {
      s: req.query.Search, 
      apikey: omdbAPIKey
    }
  }
  axios.get('http://www.omdbapi.com/', newObject)
      .then((response) => {
          console.log(response.data)
          let results = response.data.Search
          res.render('results', {results: results});
      })
      .catch(Err => {console.log('ahhhh!')
})})

// route for movies by id
app.get('/detail/:imdbID', (req, res) => {
  let qs = {
    params: {
      i: req.params.imdbID,
      apikey: omdbAPIKey
    },
  }
  axios.get('http://www.omdbapi.com/', qs)
      .then((response) => {
        let movieData = response.data
          // console.log(response.data)
          // res.send(response.data)
          res.render('detail', {movieData: movieData});
      })
      .catch(Err => {console.log(err)})
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 5000);

// We can export this server to other servers like this
module.exports = server;
