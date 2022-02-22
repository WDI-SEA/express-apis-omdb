require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const PORT = 8000;
require("dotenv").config();
const axios = require("axios");

// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
app.use(express.static("static"));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
// not sure what this is
// app.use(require("morgan")("dev"));

// Routes

// The app.listen function returns a server handle
// var server = app.listen(process.env.PORT);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// We can export this server to other servers like this
// module.exports = server;

app.get("/results", (req, res) => {
  const url = `http://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`;
  axios.get(url).then((response) => {
    const searchResults = response.data.Search;
    let movieResults = [];
    class Movie {
      constructor(title, imdbID) {
        this.title = title;
        this.imdbID = imdbID;
      }
    }
    for (let i = 0; i < response.data.Search.length; i++) {
      movieResults[i] = new Movie(
        searchResults[i].Title,
        searchResults[i].imdbID
      );
    }
    res.render("results.ejs", { movieResults: movieResults });
  });
});

app.get("/movies/:id", (req, res) => {
  const url = `http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`;
  axios.get(url).then((response) => {
    const movieDetails = response.data;
    res.render("detail.ejs", { movieDetails: movieDetails });
  });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`heck yea, listening to port ${PORT}`);
});
