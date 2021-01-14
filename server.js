require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { response } = require('express');
const API_KEY = process.env.API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/results', (req, res) => {
  console.log(req.query.searchTerm)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
    let movieData = response.data.Search
    console.log(response)
      res.render('results.ejs', {myMovies: movieData})
  })
})

app.get('/results/:id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.id}`)
  .then(response => {
    console.log(response.data)
    res.render('show', {movie: response.data})
    // let movie = response.data.IMDBid
    // res.render('/detail', {movieStuff: movie})
  })
})

app.listen(3000, () => {
  console.log('on port 3000')
})

