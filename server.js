require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const axios = require("axios");
const { response } = require("express");

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
  // res.send("Hello, backend!");
  res.render("index.ejs");
});

// axios.get("/results").then(function (response) {
//   console.log(response);
//   res.render("results.ejs", {
//     // input: req.query.userInput,
//   });
// });

app.get("/results", async (req, res) => {
  try {
    //route logic here
    const searchUrl = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.userInput}`;
    const response = await axios.get(searchUrl);

    // console.log(response.data.Search);
    res.render("results.ejs", {
      movies: response.data.Search,
      input: req.query.userInput,
    });
  } catch (err) {
    //error handling logic here
    console.log(err);
  }
});

app.get("/movies/:movie_id", async (req, res) => {
  try {
    //route logic here

    const searchUrl = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.movie_id}`;
    const response = await axios.get(searchUrl);
    console.log(response);
    res.render("detail.ejs", {
      movies: response.data,
    });
  } catch (err) {
    //error handling logic here
    console.log(err);
  }
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
