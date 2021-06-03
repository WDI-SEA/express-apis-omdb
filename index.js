// import express
const express = require('express')
// import axios
const axios = require('axios')
// Import and config dotenv library
require('dotenv').config()
// declare instance of app
const app = express()
// open up a port for app to listen on
const PORT = 3000

// Define API key var
const ombdApiKey = process.env.OMDB_API_KEY

const fs = require('fs')
// Express ejs layouts
const layouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
// Site starts at /public ->
app.use(express.static(__dirname + '/'))
app.use(layouts)

// create home route
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) => {
  let qs = {
    params: {
      s: req.query.q,
      apikey: ombdApiKey,
    },
  }
  axios
    .get('http://www.omdbapi.com', qs)
    .then((responseFromAPI) => {
      console.log(responseFromAPI.data.Search)
      let movie = responseFromAPI.data.Search

      res.render('results', { movies: movie })

      let imdbRes = responseFromAPI.data.imdbID
      //   res.render('results', { movies: imdbID })
    })

    .catch((err) => {
      console.log(err)
    })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
