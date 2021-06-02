require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const app = express()
const PORT = 3000

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// define API key var
const omdbApiKey = process.env.OMDB_API_KEY

// Routes
app.get('/', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
      .then(resFromAPI => {
          console.log(resFromAPI.data)
          res.send(resFromAPI.data.Title)
      })
      .catch(err => {
          console.log(err)
      })
})

// The app.listen function returns a server handle
app.listen(PORT, () => {
  console.log(`Welcome to our port: ${PORT}`)
})