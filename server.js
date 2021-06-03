require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const app = express()
require('dotenv').config()


// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

const omdbApiKey = process.env.OMDB_API_KEY

// Routes

// Home route
app.get('/', function(req, res) {
  res.render('index')
})

// results route - displays search results
app.get('/results', (req,res) => {
  axios.get(`http://www.omdbapi.com/?s=${req.query.q}&type=movie&apikey=${omdbApiKey}`)
    .then((response) => {
      let searchResults = response.data.Search
      res.render('results', { searchResults: searchResults, search: req.query.q })
    })
    .catch(err => console.log(err))
})

// movies/:movie_id route - shows details of the movie
app.get('/movies/:movie_id' , (req,res) => {
  axios.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${omdbApiKey}`)
    .then((response) => {
      res.render('detail', {details: response.data, keys: Object.keys(response.data)})
    })
    .catch(err => console.log(err))
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000)

// We can export this server to other servers like this
module.exports = server
