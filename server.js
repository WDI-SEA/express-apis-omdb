require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')


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
  console.log(process.env.RANDOM_ENV_VAR)
  res.send('Hello, backend!');
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;


// let results
app.get('/results', (req,res)=>{
  axios.get(`http://www.omdbapi.com/?&apikey=${process.env.API_KEY}&s=${req.query.s}`)
  .then(function (response) {
    res.render('results', {movies: response.data.Search})
  })
})

app.get('/movies/:id', (req,res)=>{
  axios.get(`http://www.omdbapi.com/?&apikey=${process.env.API_KEY}&i=${req.params.id }`)
  .then(function(response){
    res.render('detail', {movie: response.data})
  })
})
