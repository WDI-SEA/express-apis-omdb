require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static(path.join(__dirname, '/static')));
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

// results
app.get('/results', (req, res) => {
  axios.get(`http://www.omdbapi.com/?s=${req.query.Title}&apikey=${process.env.OMDB_API_KEY}&`)
  .then(response => {
  res.render('results', {movies: response.data.Search})
  })
})

app.get('/movies/:id', (req, res) => {
  let movieID = req.params.id;
  axios.get(`http://www.omdbapi.com/?s=${movieID}&apikey=${process.env.OMDB_API_KEY}&`)
    .then(response => {
    res.render('details', {movie: response.data})
  })
  // res.redirect(`/movies/${req.params.id}`)
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, () => console.log("server is working"));

// We can export this server to other servers like this
module.exports = server;

// sample JSON from omdbapi
// {"Title":
// "Star Wars Gangsta Rap",
// "Year":"2000",
// "Rated":"N/A",
// "Released":"01 Jul 2000",
// "Runtime":"3 min",
// "Genre":"Short, Comedy",
// "Director":"Thomas Lee","Writer":"Jason Brannon, Chris Crawford",
// "Actors":"Jason Brannon",
// "Plot":"Elite members of the cast of Star Wars prove that they are all natural-born homey g's.",
// "Language":"English",
// "Country":"USA",
// "Awards":"1 win.",
// "Poster":"https://m.media-amazon.com/images/M/MV5BYjZhYTAzNDAtNzZlYi00MTFhLTg3ZDctYWM0NDFlYTU3ZmI0XkEyXkFqcGdeQXVyMzUwNzcxNjU@._V1_SX300.jpg",
// "Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"}],
// "Metascore":"N/A",
// "imdbRating":"6.9",
// "imdbVotes":"108",
// "imdbID":"tt0824442",
// "Type":"movie",
// "DVD":"N/A",
// "BoxOffice":"N/A",
// "Production":"N/A",
// "Website":"N/A",
// "Response":"True"}