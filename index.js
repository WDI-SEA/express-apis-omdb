// import and config dotenv library
require('dotenv').config()
// import axios - node package allows basic get request
const axios = require('axios')
// import express
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')

//define port
const PORT = 3000

// declare an instance of an app
const app = express()

// define api key var
const omdbApiKey = process.env.OMDB_API_KEY
const rowdyResults = rowdy.begin(app)

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)


// home route
app.get('/', function(req, res) {
  // render form
  res.render('index')  
})

// grab movie search
app.get('/results', (req,res) => {
  const movies = req.query.q

  // search omdb data
  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movies}`)
    .then((response) => {
      // render data to page
      console.log(response.data)
        res.render('results.ejs', {data:response.data})
        
    })
    .catch(err => {console.log(err)})  
})

app.get('/movies/:movie_id', (req,res) => {

    // search omdb data
    axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${req.params.movie_id}`)
    .then((response) => {
      // render data to page
      console.log(response.data)
        res.render('detail.ejs', {data:response.data})
    })
    .catch(err => {console.log(err)})  
})


// open up a port for the app to listen on
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`Now listening to the dreadful sounds of ${PORT} demons 🔥`)
})

// We can export this server to other servers like this
// module.exports = index;
