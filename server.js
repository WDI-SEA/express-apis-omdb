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
  res.render('index')
})

app.get('/results', (req, res) => {
  let newObject = {
    params: {
      s: req.query.q,
      apikey: omdbApiKey
    }
  }
  axios.get("http://www.omdbapi.com/", newObject)
      .then(resFromAPI => {
        console.log(resFromAPI.data)
        if(resFromAPI.data.Response === 'False') {
          res.render('index')
        } else {
          let results = resFromAPI.data.Search
          res.render('results', { results: results })
        }
      })
      .catch(err => {
          console.log(err)
      })
})

app.get('/detail/:movie_id', (req, res) => {
  let newObject = {
    params: {
      i: req.params.movie_id,
      apikey: omdbApiKey
    }
  }
  axios.get("http://www.omdbapi.com/", newObject)
      .then(resFromAPI => {
        let movieData = resFromAPI.data
        console.log(resFromAPI.data)
        res.render('detail', { movieData: movieData })
      })
      .catch(err => {
        console.log(err)
      })
})

// The app.listen function returns a server handle
app.listen(PORT, () => {
  console.log(`Welcome to our port: ${PORT}`)
})