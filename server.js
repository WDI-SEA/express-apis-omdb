require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");

const axios = require("axios");
const app = express();

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
app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/search", async (req, res) => {
  try {
    const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=2bd1a341&`;
    const response = await axios.get(url);
    // console.log(response.data.Search);

    res.render("results.ejs", {
      movies: response.data.Search,
    });
  } catch (err) {
    console.warn(err);
  }
});

app.get("/search/detail/:id", async (req, res) => {
  try {
    const url = `http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(url);
    console.log(response.data);

    res.render("detail.ejs", {
      movieDetails: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
