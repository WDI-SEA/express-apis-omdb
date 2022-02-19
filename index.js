
// define PORT
const PORT = 8000;
require('dotenv').config()
console.log(process.env.OMDB_API_KEY)


// import axios module
const axios = require('axios');

// import express module
const express = require('express');

// create instance of an express app
const app = express();

// import ejsLayout module
const ejsLayouts = require('express-ejs-layouts');


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
app.get('/', (req, res) => {
  res.render('index.ejs');
})


app.get('/omdb', (req, res) => {
  const url = `http://www.omdbapi.com/?t=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`
  let imbID = req.params.movie_id;
  // console.log(url)
  axios.get(url)
    .then(response => {
      // console.log(response.data)
      const pathWay = response.data
      res.render('detail.ejs', {result: pathWay})
    })
})

// The app.listen function returns a server handle
app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`You are listening to port ${PORT}🎧`)
})
