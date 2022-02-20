
// define PORT
const PORT = 8000;
require('dotenv').config()
// console.log(process.env.OMDB_API_KEY)


// import axios module
const axios = require('axios');

// import express module
const express = require('express');

// create instance of an express app
const app = express();

// import ejsLayout module
const ejsLayouts = require('express-ejs-layouts');


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
app.get('/', (req, res) => {
  res.render('index.ejs');
})


// create a route for the list of movies when searched
// from form [action] it must match the app.get('____')
app.get('/movies', (req,res) => {
  // req.query.[___] <= THIS MUST MATCH THE NAME FROM THE INPUT TEXT
  const movieTitle = req.query.q
  const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response => {
      const movieResults = response.data.Search
      // console.log(movieResults)
      // res.json(response.data)
      res.render('result.ejs', {results: movieResults})
    })
    .catch((err)=> {
      console.log(err)
    })
})


app.get('/movies/:movie_id', (req,res) => {
  const imdbID = req.params.movie_id
  const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
axios.get(url)
    .then(response => {
      let movieData = response.data
      // console.log(movieData)
      res.render('detail.ejs', { id: movieData})
    })
})


// The app.listen function returns a server handle
app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`You are listening to port ${PORT}🎧`)
})
