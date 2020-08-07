require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const http = require('http')
const url = require('url')

let API_KEY = process.env.API_KEY;

app.set("view engine", "ejs");
// using ejs as the view engine for rending ejs files
app.use(express.static("static"));
// express using static to access CSS

app.get("/", (req, res) => {
  res.render('index')
});

app.get("/results", (req, res)=> {
    let qs = {
      params: {
        s: req.query.movieSearch,
        apikey: API_KEY,
      },
    };
    axios
      .get("http://www.omdbapi.com", qs)
      .then((response) => {
        let searchResults = response.data.Search;
        res.render('results', {searchResults})
      })
      .catch((err) => {
        console.log(err);
      })
});

app.get("/movies/:id", (req, res)=> {
  let qs = {
    params: {
      i: req.params.id,
      apikey: API_KEY,
    },
  };
  axios
  .get("http://www.omdbapi.com", qs)
  .then((response) => {
    let movieDetails= response.data
    console.log(movieDetails);
    res.render("detail", { movieDetails });
  })
})

app.listen(3000);
