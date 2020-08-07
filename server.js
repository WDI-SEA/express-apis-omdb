require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const axios = require("axios");
const app = express();

let API_KEY = process.env.API_KEY;
// using dotenv to hide our API key

// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
app.use(express.static("static"));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require("morgan")("dev"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results", (req, res) => {
  let qs = {
    params: {
      s: req.query.searchMovies,
      apikey: API_KEY,
    },
  };
  axios
    .get("http://www.omdbapi.com", qs)
    .then((response) => {
      console.log(response.data);
      let searchResults = response.data.Search;
      // setting variable to our data
      res.render("results", { searchResults });
      // render results with the data
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/movies/:id", (req, res) => {
  let qs = {
    params: {
      i: req.params.id,
      apikey: API_KEY,
    },
  };
  axios
    .get("http://www.omdbapi.com", qs)
    .then((response) => {
      let movieDetails = response.data;
      res.render("detail", { movieDetails });
    })
    .catch((err) => {
      console.log(err);
    });
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
