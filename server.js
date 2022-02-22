require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 8080
const axios = require("axios")


// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
//static css
app.use(express.static("public"))

// Adds some logging to each request
app.use(require('morgan')('dev'));

//controllers
app.use("/results", require("./controllers/search.js"))

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs")
})
app.get('/results', function(req, res) {
  const url = `http://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response => {
      // const searchResults
      const searchResults = response.data.Search
            res.render("results.ejs", {results: searchResults})
      // res.send(response.data)
    }).catch(err => {
      console.log(`error. cannot find what you're looking for.`)
    })
    
})


// The app.listen function returns a server handle
var server = app.listen(PORT, err => {
  console.log(`Hello from ${PORT}`) //WHAT IS THIS
});

// We can export this server to other servers like this
module.exports = server;
