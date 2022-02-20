require('dotenv').config()
const Router = require('express')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const axios = require('axios')

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
app.get('/', function (req, res) {
  res.render('index')
})
app.get('/results', function (req, res) {
  console.log("🚀 ~ file: server.js ~ line 28 ~  res",  res)
  if (req.query.search == '') {
    res.render('error')
  } else {
    const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.search}`
    axios.get(url)
      .then(response => {
        if(response.data.Search == null) {
          res.render('error')
        } else {
          res.render('results', {
          searchResults: response.data.Search,
          searchQuery: req.query.search
          })
        } 
      })
      .catch(err => {
        console.log(err)
      })
  }
})

app.get('/detail', (req, res) => {
  
  let queryString = req.query.i
  const urlDetails = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${queryString}`
  axios.get(urlDetails)
  .then(r => {
    
      res.render('detail.ejs', {
      Title: r.data.Title,
      Year: r.data.Year,
      Rated: r.data.Rated,
      Released: r.data.Released,
      Runtime: r.data.Runtime,
      Genre: r.data.Genre,
      Director: r.data.Director,
      Writer: r.data.Writer,
      Actors: r.data.Actors,
      Plot: r.data.Plot,
      Language: r.data.Language,
      Country: r.data.Country,
      Awards: r.data.Awards,
      Poster: r.data.Poster,
      Ratings: r.data.Ratings,
      Metascore: r.data.Metascore,
      imdbRating: r.data.imdbRating,
      imdbVotes: r.data.imdbVotes,
      imdbID: r.data.imdbID,
      Type: r.data.Type,
      DVD: r.data.DVD,
      BoxOffice: r.data.BoxOffice,
      Production: r.data.Production,
      Website: r.data.Website,
      Response: r.data.Response
    })
  })
  // .catch(err)
})

// The app.listen function returns a server handle
app.listen(process.env.PORT, err => {
  if (err) console.log(err)
  console.log(`Server listening to port ${process.env.PORT} 🎧`)
})

// We can export this server to other servers like this
module.exports = Router
