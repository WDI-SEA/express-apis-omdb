// API key stored in gitignored .env file and accessible
require('dotenv').config();
const express = require('express');
const axios = require('axios');
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
// home page
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// search bar leads to results page
app.get('/results', (req, res)=> {
  const url = `http://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`
  // console.log(url)
  axios.get(url)
    .then(response => {
      const searchResults = response.data.Search;
      res.render('results.ejs', {
        results: searchResults,
      })
    })
    .catch(res.render('error.ejs'))
})

app.get('/movies/:movie_id', (req, res) => {
  const idUrl = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(idUrl)
    .then (response => {
      // console.log(response.data)
      const idResults = response.data
      res.render('detail.ejs', {
        idResults
      })
    })
})

app.use((req, res) => {
  res.send('404 error, page not found 🔎')
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;