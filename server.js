require('dotenv').config();
const axios = require("axios");
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
app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/search", async (req, res) => {
  try {
    const searchUrl = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(searchUrl);
    console.log(response.data.Search)
    res.render("results.ejs", {
      movies: response.data.Search,
      input: req.query.userInput
    })
  } catch (err) {
    console.log(err)
  }
})

app.get('/search/Title', (req, res) => {
  console.log(req.query)
  axios.get(req.query.url)
  .then(response => {
    res.render('details.ejs', {movie: response.data})
  })
  .catch (err => {
    console.warn('oh no!',err)
  })
})

app.get("/results/details/:movieID", async (req,res) => {
  try {
    const newUrl = `https://www.omdbapi.com/?i=${req.params.movieID}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(newUrl)
    console.log(response.data)
    res.render('detail.ejs', {
      movieDetails: response.data
    }) 
  } catch (err) {
    console.warn('oh no', err)
  }
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
