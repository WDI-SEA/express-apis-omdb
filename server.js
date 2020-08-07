require('dotenv').config();
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const app = express();

let API_KEY = process.env.API_KEY

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

// Home Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', function(req, res) {
  // console.log(req.query.q);
  // res.render('results')
  let qs = {
    params: {
        s: req.query.q,
        apikey: API_KEY
    }
  };

  axios.get('http://www.omdbapi.com', qs)
    .then((response) => {
        // console.log(response.data);
        let movie = response.data.Search;
        res.render('results', {movie});
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/movies/:movie_id', function (req, res) {
  let imdbId = req.params.movie_id;
  let qs = {
    params: {
        i: imdbId,
        apikey: API_KEY
    }
  };

  axios.get('http://www.omdbapi.com', qs)
    .then((response) => {
        // console.log(response.data);
        let movieData = response.data;
        res.render('detail', {data: movieData});
    })
    .catch(err => {
        console.log(err);
    })
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
