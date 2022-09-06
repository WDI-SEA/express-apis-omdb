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

console.log('process.env:', process.env.API_KEY)

const API_KEY = process.env.API_KEY

// Routes
app.get('/', function(req, res) {
  // tests if home works
  // res.send('Hello, backend!');
  res.render('index')
});

app.get('/results', (req, res) => {
  // take in form data
  // GET forms create query strings
  console.log(req.query)
  const url = `http://www.omdbapi.com/?t=${req.query.q}&apikey=${API_KEY}`
  // make a http request to the SWAPI
  axios.get(url)
      .then(response => {
          // render the data to the user
          console.log(response.data)
          res.render('results', {
              input: response.data.Title,
              movies: response.data
          })
      })
      .catch(console.error)
  // render the data to the user
  // res.json(req.query)
})

app.get('/movies/:movie_id', (req, res) => {
  // take in form data
  // GET forms create query strings
  console.log(req.query)
  const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${API_KEY}`
  // make a http request to the SWAPI
  axios.get(url)
      .then(response => {
          // render the data to the user
          console.log(response.data)
          res.render('detail', {
              input: response.data.Title,
              movies: response.data
          })
      })
      .catch(console.error)
  // render the data to the user
  // res.json(req.query)
})

// The app.listen function returns a server handle
// var server = app.listen(process.env.PORT || 3000);
const PORT = 3000;
var server = app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`)
});

// We can export this server to other servers like this
module.exports = server;
