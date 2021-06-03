//Import Express
const express = require('express')
//Import axios
const axios = require('axios')
//Import AND config dotenv library
require('dotenv').config()
//PORT
const PORT = 3000
//Declare the app
const app = express()
//Import ejsLayouts
const ejsLayouts = require('express-ejs-layouts')
//Define API key var retreived from .env file
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Routes
app.get('/', (req,res) => {
  res.render('index')
})

//Create home route
app.get('/results', (req, res) => {
  let newObject = {
    params:{
      s: req.query.search,
      apikey: omdbApiKey
    }
  }
  //ORIGINAL REQUEST for information
  axios.get('http://www.omdbapi.com/', newObject)
  //RESPONSE FROM API (ACCESS to informaiton)
      .then((resFromAPI) => {
          let movies = resFromAPI.data.Search
          res.render('results.ejs', {movies: movies})
      })
      .catch(err => {console.log(err)})
})

app.get('/detail/:imdbID', (req, res) => {
  let newObject = {
    params: {
      i: req.params.imdbID,
      apikey:omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com/', newObject)
  .then((resFromAPI) => {
    console.log(resFromAPI.data.Plot)
    let details = resFromAPI.data
    res.render('detail', {detailsX: details})
  })
})

//open up a port for app to listen
app.listen(PORT, () => {
  console.log(`Working PORT: ${PORT}`)
})

