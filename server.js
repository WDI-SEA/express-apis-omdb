require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const API_KEY = process.env.API_KEY
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

app.get('/results', (req, res) =>{ 
  console.log(req)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
      // res.send(response.data)
      // let data = JSON.parse(response.data)
      console.log(response.data)
      res.render('results.ejs', {movies: response.data.Search})
  })
  .catch((error)=>{
    console.log('error', error)
    res.sendStatus(500)
  })
})

app.get('/movies/:movie_id', function(req, res) {
  // res.send(req.params.movie_id)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
  .then(response => {
      // res.send(response.data)
      // let data = JSON.parse(response.data)
      console.log(response.data)
      res.render('detail', {movie: response.data})
  })
  .catch((error)=>{
    console.log('error', error)
    res.sendStatus(500)
  })
});
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
