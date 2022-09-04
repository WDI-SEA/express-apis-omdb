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
  res.render('index')
});

app.get('/search', (req, res) => {
  const searchUrl = `http://www.omdbapi.com/?${process.env.API_KEY}&s=${req.query.s}`
  const input = req.query.s
  if(req.query.s === '') {
    res.render('500')
  }
  axios.get(searchUrl)
    .then(response => {
      const search = response.data.Search
      // console.log(searchUrl, input, search)
      res.render('results', { search, input })
    })
    .catch(console.warn)
})

app.get('/movies/:movie_id', (req, res) => {
  const id = req.params.movie_id
  const reqUrl = `http://www.omdbapi.com/?${process.env.API_KEY}&i=${id}`
  axios.get(reqUrl)
    .then(response => {
      const movie = response.data
      res.render('detail', { movie })
    })
    .catch(console.warn)
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT);

// We can export this server to other servers like this
module.exports = server;

// omdb data request: http://www.omdbapi.com/?apikey=ab979836&?s=