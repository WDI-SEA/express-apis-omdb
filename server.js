require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const app = express()

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('public'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// Adds some logging to each request
app.use(require('morgan')('dev'))

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) => {
  let searchTerm = req.query.searchTerm

  let apiParams = {
    params: {
      s: searchTerm,
      apiKey: process.env.API_KEY
    }
  }

  axios.get('http://omdbapi.com/', apiParams)
      .then(response => {
        console.log(response.data)
        res.render('results', {data: response.data.Search, searchTerm: searchTerm})
      })
      .catch(err => {
        console.log(err)
      })
})

app.get('/movies/:id', (req, res) => {
    let imdbID = req.params.id

    let apiParams = {
        params: {
            i: imdbID,
            apiKey: process.env.API_KEY
        }
    }

    axios.get('http://omdbapi.com/', apiParams)
        .then(response => {
            console.log(response.data)
            res.render('detail', {data: response.data})
        })
        .catch(err => {
            console.log(err)
        })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 8000)

// We can export this server to other servers like this
module.exports = server
