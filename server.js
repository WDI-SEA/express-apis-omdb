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
app.get('/', function(req, res) {
  res.render('index');
});

//get results
app.get('/results', (req, res)=>{
  // console.log('RESULTS');
  axios.get(`http://omdbapi.com/?s=${req.query.movie_title}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
      res.render('results', {movies: response.data.Search});
    });
})

//get details
app.get('/details/:id', (req, res) =>{
  // console.log("DETAILS");
  let param = req.params.id;
  // console.log(param);
  axios.get(`http://omdbapi.com/?i=${param}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
      // console.log(response.data);
      // console.log(response.data.Poster);
      res.render('details', {details: response.data});
    });
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
