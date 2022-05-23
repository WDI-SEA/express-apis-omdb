require('dotenv').config()
console.log(process.env)
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const { get } = require('express/lib/response')
const app = express()
const axios = require('axios')

// https://www.omdbapi.com/?t=star+wars&apikey=< api key > example url

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// Adds some logging to each request
app.use(require('morgan')('dev'))

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs')
})

//results
app.get('/results', (req, res) => {
  // console.log(req.query.userInput)
  const searchUrl = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
  axios.get(searchUrl)
    .then(response => {
      // console.log(response.data.Search)
      res.render('results.ejs', {
        movies: response.data.Search,
        input: req.query.userinputs
      })
    })
    .catch(err => {
      console.warn(err, 'error 1')
    })
})
//details
app.get('/results/detail', (req, res) => {
  const detailUrl = `https://www.omdbapi.com/?i=${req.query.id}&apikey=${process.env.API_KEY}`
  // console.log(req.query.id)
  axios.get(detailUrl)
  .then(response => {
    // console.log(response.data)
    res.render('detail.ejs', {movie: response.data})
  })
  .catch(err => {
    console.warn(err, 'error 2')
  })
})

// The app.listen function returns a server handle
const server = app.listen(process.env.PORT || 3000)

// We can export this server to other servers like this
module.exports = server
