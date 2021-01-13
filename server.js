require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const AXIOS = require('axios');
const fs = require('fs');
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
//home route - form index
app.get('/', function(req, res) {
  res.render('index');
});

//results route
app.get('/results', (req, res) =>{
  let queryTerm = req.query
  console.log(req.query);
  console.log(queryTerm.query);
  console.log(`http://www.omdbapi.com/?s=${queryTerm.query}&apikey=${process.env.OMDB_API_KEY}`)
  AXIOS.get(`http://www.omdbapi.com/?s=${queryTerm.query}&apikey=${process.env.OMDB_API_KEY}`)
  .then(response => {
    // console.log(response);
    // res.send(response.data);
    //here we will need to res.render the results page with response.data
    //response.data is an object that has an array of "Search" with each movie listed with key value pairs Title / Year / imdbID / Type / Poster
    // console.log(response.data);
    // console.log(response.data.Ratings)
    res.render('results', {data: response.data});

  });
});

//details route
//similar to how we refactored the prehistoric creatures and dinos will use a get route to display on the details linking from each movie using imdbID in the query results
//stub it out first
app.get('/movies/:movie_id', (req, res) => {
  // res.send('something');
  // console.log(req.body)
  console.log(req.params.movie_id);
  //new axios call for information
  AXIOS.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`)
  .then(response => {
      console.log(response.data.Ratings);
    //res.send(response.data);
    let ratings = response.data.Ratings;
    console.log(ratings[1].Value);
    res.render('detail', {data: response.data});
  });
});
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;