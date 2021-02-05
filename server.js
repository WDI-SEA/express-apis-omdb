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
  // res.send('Hello, backend!');
  //send to homepage
  res.render('index')
});

// route to handle query from search form
app.get('/results', (req, res)=> {
  let q = req.query.q
  var qs = {
    params: {
      s: q,
      apikey: process.env.API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success, carefule to see how the data comes back
      let data = response.data.Search
      res.render('results', {data})
    })
})

// Make a new route on your backend: GET /movies/:movie_id
app.get('/movies/:movie_id', (req, res)=> {
  // new call to axios to get specific information on a movie
  let movie_id = req.params.movie_id
  var qs = {
    params: {
      i: movie_id,
      apikey: process.env.API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success, carefule to see how the data comes back
      let data = response.data
      console.log(data)
      res.render('detail', {data})
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
