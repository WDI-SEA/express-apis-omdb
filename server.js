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

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/results', async (req, res) => {
  try{
    const resultsUrl = `http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.API_KEY}`
    const response = await axios.get(resultsUrl)

    res.render('results.ejs', {
      movies: response.data.Search,
      input: req.query.q
    })

  } catch (err) {
    console.log('FIRE', err)
  }
})

app.get('/results/details/:movie_id', async (req, res) => {
  const detailsUrl = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
  axios.get(detailsUrl)
    .then(response => {
      res.render('detail.ejs', {movie: response.data})
    })
    .catch(err => {
      console.log('FIRE', err)
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
