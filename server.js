require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const { default: Axios } = require("axios");
const app = express();

//using .env to hide API KEY
let API_KEY = process.env.API_KEY;

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
app.get('/', function(req, res) 
{
  res.render("index");
  
});

app.get("/results", function(req, res)
{
  let qs = 
  {
    params:
    {
      s: req.query.q,
      apikey: API_KEY
    }
  }
  
  Axios.get("http://www.omdbapi.com", qs)
  .then(function(response)
  {
    let movieData = response.data.Search;
    console.log(movieData);
  
    res.render("results", {movieData});
  })
  .catch(function(err)
  {
    console.log(err);
  });
});

app.get("/movie/:movie_id", function(req, res)
{
  let qs =
  {
    params:
    {
      s: req.params.movie_id,
      apikey: API_KEY
    }
  }

  Axios.get("http://omdbapi.com", qs)
  .then(function(response)
  {
    let movieData = response.data.Search;
    console.log(movieData);

    res.render("details", {movieData});
  })
  .catch(function(err)
  {
    console.log(err);
  });
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
