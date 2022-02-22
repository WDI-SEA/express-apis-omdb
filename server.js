console.log('HELLO WORLD')

require('dotenv').config();
const express = require('express');
// add axios
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const API_KEY = process.env.OMDB_API_KEY

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
  // res.send('Hello, backend!');
  res.render('index.ejs')
});


// GET request
app.get('/results', (req, res) => {
  // console.log(req.query.q)
  const url = `http://www.omdbapi.com/?s=${req.query.q}&apikey=${API_KEY}`
  // console.log(url)
  axios.get(url)
    .then(response => {
      // console.log(response.data.Search)
      const searchResults = response.data.Search 
      res.render('results.ejs', {
        results: searchResults
      })
      // .catch(err => {
      //   console.log(err)
      // })
    })
})

app.get('/movies', (req, res) => {
  const url = `http://www.omdbapi.com/?i=${req.query.i}&apikey=${API_KEY}`
  axios.get(url)
    .then((response) => {
      console.log(response.data)
      res.render('detail.ejs', {
        results: response.data
      })
    })
    // .catch(err => {
    //   console.log(err)
    // })
})

// The app.listen function returns a server handle
let server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
