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

app.get('/results', (req, res) => {
  // console.log(req.query.search)
  // console.log(req)
  const url = `http://www.omdbapi.com/?t=${req.query.q}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response => {
      // console.log(response)
      const searchResults = response.data
      // console.log(searchResults)
      res.render('results.ejs', { response: searchResults })
    })
})

app.get('/movies/:movie_id', (req, res) => {
  // console.log(req.params.movie_id)
  // res.send("Id is " + req.params.movie_id)
  const url = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response => {
      // res.send(response.data)
      const searchResults = response.data
      res.render('detail.ejs', { response: searchResults })
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
