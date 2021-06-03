// APP SETUP ------------------------------------

// MODULE SETUP
const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()


// MODULE IMPLEMENTATION
const app = express();

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"))
app.use(ejsLayouts);

// OPTIONAL CONSTANTS
const PORT = 5000
const log = console.log
const omdbApiKey = process.env.OMDB_API_KEY

// var searchResults

// ROUTES ---------------------------------------

// HOME
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// SEARCH
app.get('/results', (req, res) => {
  let searchInput = req.query.query
  axios.get(`http://www.omdbapi.com/?s=${searchInput}&apikey=${omdbApiKey}`)
  .then(resFromAPI => {
      let result = resFromAPI.data.Search
      res.render('results.ejs', {result: result})
    })
    .catch(err => {
      log(err)
    })
})

// GET DETAILS
app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  axios.get(`http://www.ombdapi.com/?i=${id}&apikey=${omdbApiKey}`)
  .then(result => {
    // let result2 = resFromAPI2.data.Search
    // res.render('detail.ejs', {result2: result2})
    log("yes")
  })
  .catch(err => {
    log(err)
  })
})

// LISTEN TO PORT
app.listen(PORT, () => {
  log(`Welcome to Port ${PORT}.`)
})
