require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');

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
  res.render('index.ejs')
});

app.get('/results', (req,res)=>{

  const url = `http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.OMDB_API_KEY}`

  axios.get(url)
    .then(response => {
      const searchResults = response.data.Search
      // console.log(searchResults)
      res.render('results.ejs', {results: searchResults})
    })

});

app.get('/movies/:movie_id', (req,res) => {

  const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response => {
      const movieDetails = response.data
      res.render('detail.ejs', {details: movieDetails})
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, err => {
  if(err) console.log(err)
  console.log('server running on port 3000')
});

// We can export this server to other servers like this
module.exports = server;
