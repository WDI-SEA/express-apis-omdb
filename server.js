require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const { default: Axios } = require('axios');
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
  res.render("index");
});

app.get("/", (req, res) => {
  let search = req.query.searchMovie;
  let qs = {
    params: {
      s: search,// fix this
      apikey: API_KEY
    }
  }
  Axios.get("http://www.omdbapi.com", qs)
  .then((response) => {
    console.log(response.data)
    let movies = response.data.Search
    console.log(movies);
    res.render("results", {data: movies});
  })
  .catch(err => {
    console.log(err);
  })
})

app.get("/movies/:id", (req ,res) => {
  let movieID = req.params.id;
  let qs = {
    params: {
      i: imdbID,
      apikey: API_KEY
    }
  }
  Axios.get("http://www.omdbapi.com', qs")
  .then((response) => {
    let movieDetails = response.data;
    console.log(movieDetails)
    res.render("detail", {data: movieDetails})
  })
  .catch(err => {
    console.log(err)
  })
})



// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
