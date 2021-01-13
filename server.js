require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
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

app.get('/results', (req, res) => {
  // console.log(req.query.searchTerm);
  axios.get(`http://www.omdbapi.com/?s=${req.query.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
      console.log(response.data.Search);
      res.render('results', {data: response.data.Search})
    })
  // console.log(req);
});

app.get('/movies/:movie_id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=${req.query.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
  res.render('detail');
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;

// app.listen(3000, () => {
//   console.log("we up and running")
// });
