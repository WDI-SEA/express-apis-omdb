require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const omdbApiKey = process.env.OMDB_API_KEY


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
  res.render('index')
})



app.get('/results', (req, res) => {
  // console.log(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${req.query.q}`);
  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${req.query.q}`)
      .then((response) => {
        console.log('*** movies: ', response);
        res.render('results', {movies: response.data.Search});
      })
      .catch(err => {console.log(err)})
});


app.get('/movies/:id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${req.params.id}`)
      .then((response) => {
        console.log(req.params.id)
        res.render('detail', {details: response.data});
      })
      .catch(err => {console.log(err)})
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);


// We can export this server to other servers like this
module.exports = server;




// `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// two ejs files
// 1 